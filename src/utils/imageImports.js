const createImageURL = (path) => new URL(path, import.meta.url).href;

// imageImports.js
const images = {
  service1: new URL("../assets/services/service1.png", import.meta.url).href,
  service2: new URL("../assets/services/service2.png", import.meta.url).href,
  service3: new URL("../assets/services/service3.jpg", import.meta.url).href,
  service4: new URL("../assets/services/service4.jpg", import.meta.url).href,
  service5: new URL("../assets/services/service5.jpg", import.meta.url).href,
  service6: new URL("../assets/services/service6.png", import.meta.url).href,
  service7: new URL("../assets/services/service7.jpg", import.meta.url).href,
  service8: new URL("../assets/services/service8.jpg", import.meta.url).href,
  service9: new URL("../assets/services/service9.jpg", import.meta.url).href,
  service10: new URL("../assets/services/Marine.jpeg", import.meta.url).href,
  new1: new URL("../assets/news/1.18.jpg", import.meta.url).href,
  new2: new URL("../assets/news/AP-KE-3.jpg", import.meta.url).href,
  new3: new URL("../assets/news/CAN.jpg", import.meta.url).href,
  new4: new URL("../assets/news/dong-ho-so-1.jpg", import.meta.url).href,
  new5: new URL("../assets/news/hc-may-do-do-on.jpg", import.meta.url).href,
  new6: new URL("../assets/news/LUC-4.jpg", import.meta.url).href,
  new7: new URL("../assets/news/MAY-DO-DO-AM-VL-4.jpg", import.meta.url).href,
  introduce1: createImageURL("../assets/introduceHome/introduce1.png"),
  introduce2: createImageURL("../assets/introduceHome/introduce2.png"),
  introduce3: createImageURL("../assets/introduceHome/introduce3.png"),
  introduce4: createImageURL("../assets/introduceHome/introduce4.jpg"),
  intro: createImageURL("../assets/intro/intro.jpg"),
  new8: createImageURL("../assets/news/nhiet.jpg"),
};

export default images;
