import express, { Application, Request, Response } from "express";
import { connectToDatabase } from "./config/database";
import { ENV } from "./config/env";

// Import routes
import userRoutes from "./modules/User/users/route/user.route";
import userTypeRoutes from "./modules/User/userTypes/route/userType.route";
import regionRoutes from "./modules/Geographical/regions/route/region.route";
import countriesRoutes from "./modules/Geographical/countries/route/countries.route";
import citiesRoutes from "./modules/Geographical/cities/route/cities.route";
import productCategoriesRoute from "./modules/Product/productCategories/route/productCategories.route";
import demoProductRoute from "./modules/Product/demoProducts/route/demoProduct.route";
import userDemoMappingRoute from "./modules/Rbac/userDemoMapping/route/userDemoMapping.route";
import sessionManagementRoute from "./modules/Activity/sessionManagement/route/sessionManagement.route";
import activityLogRoute from "./modules/Activity/activityLogs/route/activityLog.route";

const app: Application = express();
const PORT = ENV.PORT || 3000;

// Connect to MongoDB
connectToDatabase();

app.use(express.json());
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/user-types", userTypeRoutes);
app.use("/api/v1/regions", regionRoutes);
app.use("/api/v1/countries", countriesRoutes);
app.use("/api/v1/cities", citiesRoutes);
app.use("/api/v1/product-categories", productCategoriesRoute);
app.use("/api/v1/demo-products", demoProductRoute);
app.use("/api/v1/user-demo-mapping", userDemoMappingRoute);
app.use("/api/v1/session-management", sessionManagementRoute);
app.use("/api/v1/activity-logs", activityLogRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express with TypeScript!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
