import VendorLogo from "@/assets/images/logo/vendor-logo.png";

/* ═══════════════════════════════════════════════════
   VENDOR DATA
═══════════════════════════════════════════════════ */
export const VENDORS = [
  { id:1, name:"Fresh Juice Bar",     status:"Closed", rating:4.50, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:VendorLogo,   joined:"2021-03-12" },
  { id:2, name:"Food Character",      status:"Open",   rating:4.50, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:VendorLogo,   joined:"2022-07-01" },
  { id:3, name:"Food Forulard",       status:"Open",   rating:4.50, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:VendorLogo,   joined:"2023-01-18" },
  { id:4, name:"Authentic Grocery",   status:"Closed", rating:4.50, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:VendorLogo,  joined:"2020-11-05" },
  { id:5, name:"Green Basket",        status:"Open",   rating:4.20, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:VendorLogo,  joined:"2022-09-22" },
  { id:6, name:"Organic Pantry",      status:"Open",   rating:4.80, address:"530 Post Ct El Dorado Hills California, United States", phone:"+1 (511) 934-8170", logo:VendorLogo,    joined:"2021-06-14" },
];

export const SORT_OPTIONS = [
  { value:"latest",  label:"Sort By Latest"    },
  { value:"oldest",  label:"Sort By Oldest"    },
  { value:"rating",  label:"Sort By Rating"    },
  { value:"name_az", label:"Name: A → Z"       },
  { value:"name_za", label:"Name: Z → A"       },
  { value:"open",    label:"Open First"        },
];