const PREFIX = "/";
const path = {
    Root: PREFIX + '',
    Home: PREFIX + '',
    Login: PREFIX + 'login',
    Dashboard: PREFIX + 'dashboard',
    ForgotPassword: PREFIX + 'forgotpassword',
    ResetPassword: PREFIX + 'resetpassword',
    Category: PREFIX + 'category',
    CategoryCreate: PREFIX + 'category/create',
    CategoryEdit: PREFIX + 'category/edit/:editCategory',

    SubCategory: PREFIX + 'sub-category',
    SubCategoryCreate: PREFIX + 'sub-category/create',
    SubCategoryEdit: PREFIX + 'sub-category/edit/:editSubCategory',

    

    Department: PREFIX + 'department',
    DepartmentCreate: PREFIX + 'department/create',
    DepartmentEdit: PREFIX + 'department/edit/:editDepartment',


    Service: PREFIX + 'service',
    ServiceCreate: PREFIX + 'service/create',
    ServiceEdit: PREFIX + 'service/edit/:editService',
    ServiceView: PREFIX + 'service/view/:editService',

    

    Product: PREFIX + 'product',
    ProductCreate: PREFIX + 'product/create',
    ProductEdit: PREFIX + 'product/edit/:editproduct',
    ProductView: PREFIX + 'product/view/:editproduct',
    
    Maintenance: PREFIX + 'maintenance',
    MaintenanceCreate: PREFIX + 'maintenance/create',
    MaintenanceEdit: PREFIX + 'maintenance/edit/:editmaintenance',
    MaintenanceView: PREFIX + 'maintenance/view/:editmaintenance',

    Customer: PREFIX + 'customer',
    CustomerCreate: PREFIX + 'customer/create',
    CustomerEdit: PREFIX + 'customer/edit/:editcustomer',

    User: PREFIX + 'user',
    UserCreate: PREFIX + 'user/create',
    UserEdit: PREFIX + 'user/edit/:usercustomer',
    
    PasswordOfUser : PREFIX + "user/password",
    EditPasswordOfUser : PREFIX + "user/password/:userId",

    VendorManagement: PREFIX + 'vendor-management',
    VendorManagementCreate: PREFIX + 'vendor-management/create',
    VendorManagementEdit: PREFIX + 'vendor-management/edit/:editVendorManagement',

    PointOfContact : PREFIX + "customer/point-of-contact",
    EditPointOfContact : PREFIX + "customer/point-of-contact/:customerId",
    Address : PREFIX + "customer/address",
    EditAddress : PREFIX + "customer/address/:customerId",

    CustomerMaintenance : PREFIX + "customer/maintenance",
    EditMaintenance : PREFIX + "customer/maintenance/:customerId" 
    
    // RMList: PREFIX + 'rm',
    // RMCreate: PREFIX + 'rm/create',
    // RMUpdate: PREFIX + 'rm/update',
    // DealerList: PREFIX + 'dealer',
    // DealerCreate: PREFIX + 'dealer/create',
    // DealerUpdate: PREFIX + 'dealer/update',
    // Inventory: PREFIX + 'inventory',
    // InventoryCreate: PREFIX + 'inventory/create',
    // InventoryUpdate: PREFIX + 'inventory/update',
    // TestDrive: PREFIX + 'test-drive',
    // TestDriveCreate: PREFIX + 'test-drive/create',
    // TestDriveUpdate: PREFIX + 'test-drive/update',
    // CampaginsList: PREFIX + 'deal-configurator/campaign',
    // FinanceList: PREFIX + 'deal-configurator/finance',
    // CampaginsCreate: PREFIX + 'campaign/create',
    // CampaginsEdit: PREFIX + 'deal-configurator/campaign/edit/:editCampaign',
    // CampaginsView: PREFIX + 'deal-configurator/campaign/view/:editCampaign',
    // Slots: PREFIX + 'test-drive/slot/:editSlot',
    // DealConfigurator: PREFIX + 'deal-configurator',
    // FinanceCreate: PREFIX + 'deal-configurator/finance/create',
    // FinanceEdit: PREFIX + 'deal-configurator/finance/edit/:editFinance',
    // FinanceView: PREFIX + 'deal-configurator/finance/view/:editFinance',
    // Insurance: PREFIX + 'deal-configurator/insurance',
};

export default path;
