import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const resources = {
  eng: {
    translation: {
      catalog: "Catalog",
      delivery: "Delivery",
      about: "Information",
      contacts: "Address",
    },
  },
  vie: {
    translation: {
      catalog: "Danh Mục",
      delivery: "Giao Hàng",
      about: "Thông Tin",
      contacts: "Địa Chỉ",
    },
  },
};
i18n.use(initReactI18next).init({
  resources,
  lng: "eng",
  // keySeparator: false,
  // interpolation: {
  //   escapeValue: false,
  // },
});
export default i18n;
