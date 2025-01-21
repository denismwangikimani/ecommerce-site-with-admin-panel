import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";

//we will create an async function that will fetch the sales data from the database
async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true }, // sum the pricePaidInCents field
    _count: true, // count the number of records
  });

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100, // convert cents to dollars and return zero if no data(sales/orders)
    numberOfSales: data._count, // return the number of sales/orders
  };
}

//we will create an async function that will fetch the users data from the database
async function getUserData() {
  //we will get the count of the users and the sum of the pricePaidInCents field from the orders table
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);

  //we will return the user count and the average value per user
  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / userCount / 100, // convert cents to dollars and return zero if no data(users)
  };
}

//we will create an async function that will fetch the products data from the database and return the active and inactive count
async function getProductData() {
    //we will get the count of the active and inactive products
    const [activeCount, inactiveCount] = await Promise.all([
      db.product.count({ where: { isAvailableForPurchase: true } }),
      db.product.count({ where: { isAvailableForPurchase: false } }),
    ])
  
    return { activeCount, inactiveCount }
  }
  

export default async function AdminDashboard() {
  //we will fetch the sales data, the users data and the product data in a single promise
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashBoardCard
        title="Total Sales"
        subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={formatCurrency(salesData.amount)}
      />
      <DashBoardCard
        title="Total Users"
        subtitle={`${formatCurrency(userData.averageValuePerUser)} Users`}
        body={formatNumber(userData.userCount)}
      />
      <DashBoardCard
        title="Active Products"
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  );
}

//
type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

//we will create a component that will take the title, description and content as props and render it in a card component
export function DashBoardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>{body}</CardContent>
    </Card>
  );
}
