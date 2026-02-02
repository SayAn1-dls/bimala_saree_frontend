import { AdminLayout } from "@/components/admin/AdminLayout";
import { Package, ShoppingCart, Users, TrendingUp, IndianRupee } from "lucide-react";

const stats = [
  {
    name: "Total Revenue",
    value: "₹2,45,890",
    change: "+12.5%",
    icon: IndianRupee,
    color: "bg-green-500",
  },
  {
    name: "Total Orders",
    value: "156",
    change: "+8.2%",
    icon: ShoppingCart,
    color: "bg-blue-500",
  },
  {
    name: "Total Products",
    value: "89",
    change: "+3",
    icon: Package,
    color: "bg-accent",
  },
  {
    name: "Customers",
    value: "1,234",
    change: "+24",
    icon: Users,
    color: "bg-primary",
  },
];

const recentOrders = [
  { id: "ORD001", customer: "Priya Sharma", amount: 15999, status: "Delivered", date: "Jan 28, 2026" },
  { id: "ORD002", customer: "Ananya Das", amount: 22999, status: "Shipped", date: "Jan 28, 2026" },
  { id: "ORD003", customer: "Meera Patel", amount: 8999, status: "Processing", date: "Jan 27, 2026" },
  { id: "ORD004", customer: "Riya Singh", amount: 12999, status: "Pending", date: "Jan 27, 2026" },
  { id: "ORD005", customer: "Sneha Roy", amount: 28999, status: "Delivered", date: "Jan 26, 2026" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-800";
    case "Shipped":
      return "bg-blue-100 text-blue-800";
    case "Processing":
      return "bg-yellow-100 text-yellow-800";
    case "Pending":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const AdminDashboard = () => {
  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground font-body">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-card rounded-xl p-6 shadow-soft border border-border"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-semibold text-green-600 font-body flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-display font-bold text-foreground">
              {stat.value}
            </p>
            <p className="text-sm text-muted-foreground font-body">{stat.name}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-display font-semibold text-foreground">
            Recent Orders
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-body">
                  Order ID
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-body">
                  Customer
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-body">
                  Amount
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-body">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-body">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-primary font-body">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground font-body">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground font-body">
                    ₹{order.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground font-body">
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
