const Vars = {
  // TEXT COLOR ###########################
  color: {
    darkGray_D: "rgb(40, 40, 40)", // Dark
    blue_D: "rgb(5, 45, 145)", // Dark
    blue_M: "rgb(35, 95, 250)", // Medium
    blue_L: "rgb(200, 213, 245)" // Light
  },
  colorBtn: {
    darkBlue_D: "rgb(30,40,90)", // Dark
    darkBlue_M: "rgb(100,100,130)", //  Medium
    darkBlue_L: "rgb(201,201,245)" // Light
  },
  colorLogo: {
    colorLogo: "rgb(175, 225, 145)",
    colorLogoHover: "rgb(145, 170, 130)"
  },

  // FONT  #########################
  fontWeight: {
    bold: "bold"
  },

  //  BACKGROUND COLOR  ####################
  bgColor: {
    blue_D: "rgb(5, 45, 145)", // Dark
    blue_M: "rgb(35, 95, 250)", // Medium
    blue_L: "rgb(200, 213, 245)" // Light
  },

  //  PADDING  ##############################
  btnPadding: {
    L: "24px", // Large
    M: "16px", // Medium
    S: "8px" // Small
  },
  padding: {
    L: "24px", // Large
    M: "16px", // Medium
    S: "8px" // Small
  },

  //  MARGIN  ##################################
  marginInline: {
    L: "24px", // Large
    M: "16px", // Medium
    S: "8px" // Small
  },

  //  BORDER RADIUS
  borderRadiusBtn: {
    L: "12px", // Large
    M: "8px", // Medium
    S: "6px" // Small
  }
};

const ConfigBtnBlueM = {
  backgroundColor: Vars.bgColor.blue_M,
  backgroundColorHover: Vars.bgColor.blue_D,
  border: Vars.bgColor.blue_M,
  color: Vars.colorBtn.darkBlue_L,
  colorHover: Vars.colorBtn.darkBlue_D,
  padding: Vars.btnPadding.M,
  borderRadius: Vars.borderRadiusBtn.M,
  fontWeight: Vars.fontWeight.bold,
  borderColorHover: Vars.bgColor.blue_D,
  text: "MORE",
  buttonLink: "/about"
};

const ConfigLogo = {
  colorLogo: Vars.colorLogo.colorLogo,
  colorLogoHover: Vars.colorLogo.colorLogoHover,
  padding: Vars.padding.S,
  fontWeight: Vars.fontWeight.bold
};

// ...Cnf -> config


export { Vars, ConfigBtnBlueM, ConfigLogo };
