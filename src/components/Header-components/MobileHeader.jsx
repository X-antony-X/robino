import CardNav from "../CardNav";

function MobileHeader() {
    const items = [
        {
        label: "EXPLORE",
        bgColor: "#0D0716",
        textColor: "#fff",
        links: [
            { label: "GO TO HOME", ariaLabel: "Go to Home" },
            { label: "OUR PRODUCTS", ariaLabel: "View our Products" }
        ]
        },
        {
        label: "SHOWCASE", 
        bgColor: "#170D27",
        textColor: "#fff",
        links: [
            { label: "PORTFOLIO", ariaLabel: "View Portfolio" },
            { label: "MAKE ORDER", ariaLabel: "Make a Custom Order" }
        ]
        },
        {
        label: "GET IN TOUCH",
        bgColor: "#271E37", 
        textColor: "#fff",
        links: [
            { label: "FACEBOOK", ariaLabel: "Email us" },
            { label: "INSTAGRAM", ariaLabel: "Twitter" },
            { label: "WHATSAPP GROUP", ariaLabel: "LinkedIn" }
        ]
        }
    ]
    return (
    <CardNav
    //   logo={logo}
      logoAlt="Company Logo"
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
    />
    )
}

export default MobileHeader;