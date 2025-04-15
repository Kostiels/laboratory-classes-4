const { MENU_LINKS } = require("../constants/navigation");

const getHomeView = (_request, response) => {
  response.render("home.ejs", {
    headTitle: "Shop - Home",
    path: "/",
    activeLinkPath: "/",
    menuLinks: MENU_LINKS,
  });
};

module.exports = {
  getHomeView
};