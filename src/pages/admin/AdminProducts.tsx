import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { sarees, fabrics, colors, occasions } from "@/lib/data";
import { Plus, Pencil, Trash2, Search, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminProducts = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    nameBn: "",
    price: "",
    originalPrice: "",
    fabric: "",
    color: "",
    occasion: "",
    length: "",
    description: "",
  });

  const filteredSarees = sarees.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameBn.includes(searchQuery)
  );

  const handleAddProduct = () => {
    toast({
      title: "Product Added",
      description: `${newProduct.name} has been added to the catalog.`,
    });
    setIsAddDialogOpen(false);
    setNewProduct({
      name: "",
      nameBn: "",
      price: "",
      originalPrice: "",
      fabric: "",
      color: "",
      occasion: "",
      length: "",
      description: "",
    });
  };

  const handleDeleteProduct = (name: string) => {
    toast({
      title: "Product Deleted",
      description: `${name} has been removed from the catalog.`,
    });
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
            Products
          </h1>
          <p className="text-muted-foreground font-body">
            Manage your saree catalog
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-primary font-body">
              <Plus className="mr-2 h-4 w-4" />
              Add New Saree
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Add New Saree</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Image Upload */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground font-body mb-2">
                  Drag and drop images here, or click to browse
                </p>
                <Button variant="outline" className="font-body">
                  Upload Images
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-body">Product Name (English)</Label>
                  <Input
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Royal Red Banarasi Silk"
                    className="input-elegant font-body"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-body">Product Name (Bengali)</Label>
                  <Input
                    value={newProduct.nameBn}
                    onChange={(e) => setNewProduct({ ...newProduct, nameBn: e.target.value })}
                    placeholder="রয়্যাল রেড বেনারসি সিল্ক"
                    className="input-elegant font-body"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-body">Price (₹)</Label>
                  <Input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="15999"
                    className="input-elegant font-body"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-body">Original Price (₹) - Optional</Label>
                  <Input
                    type="number"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                    placeholder="19999"
                    className="input-elegant font-body"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="font-body">Fabric</Label>
                  <Select
                    value={newProduct.fabric}
                    onValueChange={(value) => setNewProduct({ ...newProduct, fabric: value })}
                  >
                    <SelectTrigger className="input-elegant font-body">
                      <SelectValue placeholder="Select fabric" />
                    </SelectTrigger>
                    <SelectContent>
                      {fabrics.map((f) => (
                        <SelectItem key={f} value={f}>
                          {f}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-body">Color</Label>
                  <Select
                    value={newProduct.color}
                    onValueChange={(value) => setNewProduct({ ...newProduct, color: value })}
                  >
                    <SelectTrigger className="input-elegant font-body">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-body">Occasion</Label>
                  <Select
                    value={newProduct.occasion}
                    onValueChange={(value) => setNewProduct({ ...newProduct, occasion: value })}
                  >
                    <SelectTrigger className="input-elegant font-body">
                      <SelectValue placeholder="Select occasion" />
                    </SelectTrigger>
                    <SelectContent>
                      {occasions.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-body">Length</Label>
                <Input
                  value={newProduct.length}
                  onChange={(e) => setNewProduct({ ...newProduct, length: e.target.value })}
                  placeholder="6.3 meters"
                  className="input-elegant font-body"
                />
              </div>

              <div className="space-y-2">
                <Label className="font-body">Description</Label>
                <Textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Describe the saree..."
                  className="input-elegant font-body min-h-[100px]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  className="font-body"
                >
                  Cancel
                </Button>
                <Button onClick={handleAddProduct} className="btn-primary font-body">
                  Add Product
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 input-elegant font-body"
        />
      </div>

      {/* Products Table */}
      <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-body">
                  Product
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-body">
                  Fabric
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-body">
                  Price
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-body">
                  Status
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-body">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredSarees.map((saree) => (
                <tr key={saree.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={saree.image}
                        alt={saree.name}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold text-foreground font-body text-sm">
                          {saree.name}
                        </p>
                        <p className="text-xs text-muted-foreground font-body">
                          {saree.nameBn}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground font-body">
                    {saree.fabric}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground font-body text-sm">
                      ₹{saree.price.toLocaleString()}
                    </p>
                    {saree.originalPrice && (
                      <p className="text-xs text-muted-foreground line-through font-body">
                        ₹{saree.originalPrice.toLocaleString()}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        saree.inStock
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {saree.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteProduct(saree.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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

export default AdminProducts;
