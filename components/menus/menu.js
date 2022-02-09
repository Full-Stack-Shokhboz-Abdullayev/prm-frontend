export const menuItems = [
  {
    id: 1,
    label: "Asosiy",
    isTitle: true
  },
  {
    id: 2,
    label: "Dashboard",
    icon: "ri-dashboard-line",

    isMenuCollapsed: false,
    subItems: [
      {
        id: 4,
        label: "CRM",
        link: "/base/dashboard"
      }
    ]
  },

  {
    id: 213,
    label: "Loyihalar",
    icon: "fe-briefcase",
    isMenuCollapsed: false,
    subItems: [
      {
        id: 214,
        label: "Baza",
        link: { name: "base-projects" }
      },
      {
        id: 215,
        label: "Yangi qo'shish",
        link: { name: "base-projects-add" },
        roles: ["admin", "moderator"]
      }
    ]
  },
  {
    id: 216,
    label: "Shahar/Tumanlar",
    icon: "fe-map-pin",
    isMenuCollapsed: false,
    subItems: [
      {
        id: 217,
        label: "Baza",
        link: { name: "base-cities" }
      },
      {
        id: 218,
        label: "Yangi qo'shish",
        link: { name: "base-cities-add" },
        roles: ["admin", "moderator"]
      }
    ]
  },
  {
    id: 236,
    label: "Admin/Moderatorlar",
    icon: "fe-user",
    isMenuCollapsed: false,
    roles: ["admin", "moderator"],
    subItems: [
      {
        id: 217,
        label: "Baza",
        link: { name: "base-users" }
      },
      {
        id: 218,
        label: "Yangi qo'shish",
        link: { name: "base-users-add" },
        roles: ["admin"]
      }
    ]
  },
  {
    id: 219,
    icon: "fe-log-in",
    label: "Avtorizatsiya",
    link: { name: "base-login" },
    roles: ["guest"]
  }
];
