import CardNav from "../CardNav";

function MobileHeader() {
    const items = [
        {
        label: "EXPLORE",
        bgColor: "#0D0716",
        textColor: "#fff",
        links: [
            { label: "GO TO HOME", ariaLabel: "Go to Home" , to: "/"},
            { label: "OUR PRODUCTS", ariaLabel: "View our Products" , to: "/products"}
        ]
        },
        {
        label: "SHOWCASE", 
        bgColor: "#170D27",
        textColor: "#fff",
        links: [
            { label: "PORTFOLIO", ariaLabel: "View Portfolio" , to: "/portfolio"},
            { label: "MAKE ORDER", ariaLabel: "Make a Custom Order" , to: "/form"}
        ]
        },
    ]
    return (
    <CardNav
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