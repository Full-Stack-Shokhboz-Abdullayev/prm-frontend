export default cities => [
  {
    required: true,
    title: "Majburiy Ma'lumotlar",
    icon: "",
    fields: [
      {
        label: "Nomi",
        key: "title",
        value: ""
      },
      {
        label: "Tashabbuskor nomi",
        key: "owner_company",
        value: ""
      },
      {
        label: "Yo'nalishi",
        key: "direction",
        value: ""
      },
      {
        label: "Tarmoq Yo'nalishi",
        key: "net_direction",
        value: ""
      },
      {
        label: "Shahar/Tuman",
        key: "city",
        type: "select",
        hasPlaceholder: true,
        value: "",
        options: cities.map(city => ({
          label: city.title,
          value: city.id
        }))
      }
    ]
  },
  {
    title: "Ixtiyoriy Ma'lumotlar",
    icon: "",
    fields: [
      {
        label: "Dalolatnoma Raqami",
        key: "contract_number",
        type: "number",
        value: 0
      },
      {
        label: "Rejadagi Umumiy qiymati (mln so'm)",
        key: "value_in_plan",
        type: "number",
        value: 0
      },
      {
        label: "Amaldagi Umumiy qiymati (mln so'm)",
        key: "value_in_practice",
        type: "number",
        value: 0
      },
      {
        label: "Rejadagi o'z sarmoyasi (mln so'm)",
        key: "financing_own_investment_in_plan",
        type: "number",
        value: 0
      },
      {
        label: "Amaldagi o'z sarmoyasi (mln so'm)",
        key: "financing_own_investment_in_practice",
        type: "number",
        value: 0
      },
      {
        label: "Rejadagi Bank sarmoyasi (mln so'm)",
        key: "financing_bank_in_plan",
        type: "number",
        value: 0
      },
      {
        label: "Amaldagi Bank sarmoyasi (mln so'm)",
        key: "financing_bank_in_practice",
        type: "number",
        value: 0
      },
      {
        label: "Rejadagi Xorijiy Bank sarmoyasi (ming dollar)",
        key: "financing_international_bank_in_plan",
        type: "number",
        value: 0
      },
      {
        label: "Amaldagi Xorijiy Bank sarmoyasi (ming dollar)",
        key: "financing_international_bank_in_practice",
        type: "number",
        value: 0
      },
      {
        label: "Rejadagi Xorijiy Investitsiya sarmoyasi (ming dollar)",
        key: "financing_international_investment_in_plan",
        type: "number",
        value: 0
      },
      {
        label: "Amaldagi Xorijiy Investitsiya sarmoyasi (ming dollar)",
        key: "financing_international_investment_in_practice",
        type: "number",
        value: 0
      },
      {
        label: "Rejadagi Ish o'rinlari",
        key: "workplaces_in_plan",
        type: "number",
        value: 0
      },
      {
        label: "Amaldagi Ish o'rinlari",
        key: "workplaces_in_practice",
        type: "number",
        value: 0
      },
      {
        label: "RIP 459",
        key: "rip_459",
        type: "select",
        options: [
          {
            label: "Yo'q",

            value: false
          },
          {
            label: "Bor",
            value: true
          }
        ],

        value: false
      },
      {
        label: "Ishga tushganligi",
        key: "in_production",
        type: "select",
        options: [
          {
            label: "Yo'q",

            value: false
          },
          {
            label: "Ha",
            value: true
          }
        ],
        value: false
      },
      {
        label: "Ishga tushmaslik xavfi",
        key: "danger_of_cancellation",
        type: "select",
        options: [
          {
            label: "Yo'q",
            value: false
          },
          {
            label: "Bor",
            value: true
          }
        ],
        value: false
      },
      {
        label: "Bekor Qilinganligi",
        key: "cancelled",
        type: "select",
        options: [
          {
            label: "Yo'q",
            value: false
          },
          {
            label: "Ha",
            value: true
          }
        ],
        value: false
      },
      {
        label: "O'zlashtirilgan",
        key: "owned",
        value: false,
        type: "select",
        options: [
          {
            label: "Yo'q",
            value: false
          },
          {
            label: "Ha",
            value: true
          }
        ]
      },
      {
        label: "Xizmat ko'rsatuvchi bank",
        key: "serving_bank",
        value: ""
      },
      {
        label: "Rejadagi Ishga tushish vaqti",
        key: "start_date_in_plan",
        type: "date",
        value: ""
      },
      {
        label: "Amaldagi Ishga tushish vaqti",
        key: "start_date_in_practice",
        type: "date",
        value: ""
      }
    ]
  }
];
