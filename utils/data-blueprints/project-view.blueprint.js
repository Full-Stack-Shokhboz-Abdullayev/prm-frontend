import { dateFormatter, boolFormatter } from "../formatters";
export default [
  { key: "id", thClass: "d-none", tdClass: "d-none" },
  {
    label: "Nomi",
    key: "title",
    sortable: true
  },
  {
    label: "Tashabbuskor nomi",
    key: "owner_company",
    sortable: true
  },
  {
    label: "Yo'nalishi",
    key: "direction",
    sortable: true
  },
  {
    label: "Tarmoq Yo'nalishi",
    key: "net_direction",
    sortable: true
  },
  {
    label: "Dalolatnoma Raqami",
    key: "contract_number",
    sortable: true
  },
  {
    label: "Status",
    key: "status",
    sortable: false
  },
  {
    label: "Rejadagi Umumiy qiymati (mln so'm)",
    key: "value_in_plan",
    sortable: true
  },
  {
    label: "Amaldagi Umumiy qiymati (mln so'm)",
    key: "value_in_practice",
    sortable: true
  },
  {
    label: "Rejadagi o'z sarmoyasi (mln so'm)",
    key: "financing_own_investment_in_plan",
    sortable: true
  },
  {
    label: "Amaldagi o'z sarmoyasi (mln so'm)",
    key: "financing_own_investment_in_practice",
    sortable: true
  },
  {
    label: "Rejadagi Bank sarmoyasi (mln so'm)",
    key: "financing_bank_in_plan",
    sortable: true
  },
  {
    label: "Amaldagi Bank sarmoyasi (mln so'm)",
    key: "financing_bank_in_practice",
    sortable: true
  },
  {
    label: "Rejadagi Xorijiy Bank sarmoyasi (ming dollar)",
    key: "financing_international_bank_in_plan",
    sortable: true
  },
  {
    label: "Amaldagi Xorijiy Bank sarmoyasi (ming dollar)",
    key: "financing_international_bank_in_practice",
    sortable: true
  },
  {
    label: "Rejadagi Xorijiy Investitsiya sarmoyasi (ming dollar)",
    key: "financing_international_investment_in_plan",
    sortable: true
  },
  {
    label: "Amaldagi Xorijiy Investitsiya sarmoyasi (ming dollar)",
    key: "financing_international_investment_in_practice",
    sortable: true
  },
  {
    label: "Rejadagi Ish o'rinlari",
    key: "workplaces_in_plan",
    sortable: true
  },
  {
    label: "Amaldagi Ish o'rinlari",
    key: "workplaces_in_practice",
    sortable: true
  },
  {
    label: "RIP 459",
    key: "rip_459",
    formatter: val => boolFormatter(val, ["Bor", "Yo'q"]),
    sortable: true
  },
  {
    label: "Ishga tushganligi",
    key: "in_production",
    formatter: val => boolFormatter(val, ["Ha", "Yo'q"]),
    sortable: true
  },
  {
    label: "Ishga tushmaslik xavfi",
    key: "danger_of_cancellation",
    formatter: val => boolFormatter(val, ["Bor", "Yo'q"]),
    sortable: true
  },
  {
    label: "Bekor Qilingan",
    key: "cancelled",
    formatter: val => boolFormatter(val, ["Ha", "Yo'q"]),
    sortable: true
  },
  {
    label: "O'zlashtirilgan",
    key: "owned",
    formatter: val => boolFormatter(val, ["Ha", "Yo'q"]),
    sortable: true
  },
  {
    label: "Shahar/Tuman",
    key: "city.title"
  },
  {
    label: "Xizmat ko'rsatuvchi bank",
    key: "serving_bank",
    sortable: true
  },
  {
    label: "Rejadagi Ishga tushish vaqti",
    key: "start_date_in_plan",
    formatter: dateFormatter,
    sortable: true
  },
  {
    label: "Amaldagi Ishga tushish vaqti",
    key: "start_date_in_practice",
    formatter: dateFormatter,
    sortable: true
  }
];
