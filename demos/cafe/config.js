/* ==========================================================================
   CAFE CONFIG — the only file you edit to personalise this demo for a cafe.
   Every page (guest menu + dashboard) reads from window.CAFE_CONFIG.
   ========================================================================== */
window.CAFE_CONFIG = {
  id: "kesar-lane",                 // storage namespace; change per cafe
  name: "Kesar Lane Café",          // fictional sample cafe
  wordmark: "Kesar Lane",           // logo text
  logoMark: "K",                    // single-letter monogram in the badge
  tagline: "Slow coffee, Pune breakfasts & all-day plates",
  demo: true,                       // shows the 'Demo menu' pill + footer note
  colors: {
    primary: "#B4532A",             // terracotta (buttons, highlights)
    accent: "#D9A441",              // saffron (tags, details)
    background: "#F7F2EA",          // warm paper
    text: "#1F1A16"                 // espresso ink
  },
  currency: { symbol: "₹", code: "INR", locale: "en-IN" },
  charges: [                         // optional; set [] to hide
    { label: "GST", percent: 5 }
  ],
  orderPrefix: "KL",
  menu: [
    { id: "coffee", name: "Coffee", items: [
      { id: "cappuccino", name: "Cappuccino", price: 190, veg: true, image: "assets/img/cappuccino.webp",
        description: "Double shot of our house medium roast with velvety steamed milk.", tags: ["Bestseller"],
        addons: [
          { id: "milk", name: "Milk", type: "single", required: true, options: [
            { id: "whole", name: "Whole milk", price: 0 }, { id: "oat", name: "Oat milk", price: 60 }, { id: "almond", name: "Almond milk", price: 60 } ] },
          { id: "extras", name: "Extras", type: "multi", required: false, max: 3, options: [
            { id: "shot", name: "Extra shot", price: 50 }, { id: "hazelnut", name: "Hazelnut syrup", price: 40 }, { id: "cinnamon", name: "Cinnamon dust", price: 0 } ] } ] },
      { id: "flatwhite", name: "Flat White", price: 210, veg: true, image: "assets/img/flatwhite.webp",
        description: "Ristretto shots, a thin silky layer of milk. Strong and smooth.", tags: [],
        addons: [ { id: "milk", name: "Milk", type: "single", required: true, options: [
            { id: "whole", name: "Whole milk", price: 0 }, { id: "oat", name: "Oat milk", price: 60 } ] } ] },
      { id: "filterkaapi", name: "South Indian Filter Kaapi", price: 120, veg: true, image: "assets/img/filterkaapi.webp",
        description: "Chicory-blend decoction, frothed with hot milk and served in a dabarah.", tags: ["House special"] },
      { id: "coldbrew", name: "Mint Cold Brew", price: 240, veg: true, image: "assets/img/coldbrew.webp",
        description: "18-hour cold brew over ice with a splash of milk and fresh mint.", tags: ["New"] },
      { id: "coldcoffee", name: "Classic Cold Coffee", price: 180, veg: true, image: "assets/img/coldcoffee.webp",
        description: "Chilled coffee and milk over ice, topped with a cream float.", tags: ["Bestseller"],
        addons: [ { id: "top", name: "Toppings", type: "multi", required: false, options: [
            { id: "icecream", name: "Extra ice cream", price: 50 }, { id: "choco", name: "Chocolate drizzle", price: 30 } ] } ] }
    ]},
    { id: "chai", name: "Chai & Coolers", items: [
      { id: "masalachai", name: "Masala Chai", price: 70, veg: true, image: "assets/img/masalachai.webp",
        description: "Assam tea simmered with ginger, cardamom and our house spice mix.", tags: ["Bestseller"],
        addons: [ { id: "size", name: "Size", type: "single", required: true, options: [
            { id: "cutting", name: "Cutting", price: 0 }, { id: "full", name: "Full cup", price: 30 }, { id: "kettle", name: "Kettle (serves 3)", price: 140 } ] },
          { id: "sweet", name: "Sweetness", type: "single", required: false, options: [
            { id: "less", name: "Less sugar", price: 0 }, { id: "none", name: "No sugar", price: 0 }, { id: "jaggery", name: "Jaggery", price: 10 } ] } ] },
      { id: "kokumcooler", name: "Kokum Sherbet Cooler", price: 120, veg: true, image: "assets/img/kokumcooler.webp",
        description: "Konkan kokum, roasted cumin and black salt, topped with soda.", tags: [] },
      { id: "nimbupani", name: "Mint Nimbu Soda", price: 110, veg: true, image: "assets/img/nimbupani.webp",
        description: "Fresh lime, crushed mint, sweet or salted.", tags: [],
        addons: [ { id: "style", name: "Style", type: "single", required: true, options: [
            { id: "sweet", name: "Sweet", price: 0 }, { id: "salted", name: "Salted", price: 0 }, { id: "mixed", name: "Mixed", price: 0 } ] } ] },
      { id: "mangolassi", name: "Alphonso Mango Lassi", price: 160, veg: true, image: "assets/img/mangolassi.webp",
        description: "Thick hung-curd lassi with Ratnagiri mango pulp.", tags: ["Seasonal"] }
    ]},
    { id: "breakfast", name: "Breakfast", items: [
      { id: "croissant", name: "Butter Croissant & Coffee", price: 290, veg: true, image: "assets/img/croissant.webp",
        description: "Flaky all-butter croissant with a small latte of your choice.", tags: ["Combo"] },
      { id: "akuri", name: "Parsi Akuri on Toast", price: 240, veg: false, image: "assets/img/akuri.webp",
        description: "Soft spiced scrambled eggs with green chilli and coriander on toast.", tags: [] },
      { id: "poha", name: "Indori Poha", price: 130, veg: true, image: "assets/img/poha.webp",
        description: "Flattened rice with peanuts, sev, pomegranate and a squeeze of lime.", tags: [] },
      { id: "pancakes", name: "Buttermilk Pancakes", price: 260, veg: true, image: "assets/img/pancakes.webp",
        description: "A stack of fluffy buttermilk pancakes with maple syrup on the side.", tags: [],
        addons: [ { id: "top", name: "Add-ons", type: "multi", required: false, options: [
            { id: "nutella", name: "Nutella", price: 60 }, { id: "berries", name: "Berry compote", price: 50 }, { id: "icecream", name: "Vanilla scoop", price: 50 } ] } ] },
      { id: "omelette", name: "Masala Omelette", price: 190, veg: false, image: "assets/img/omelette.webp",
        description: "Two-egg omelette with onion, tomato, chilli and cheese, served with fresh greens.", tags: [],
        addons: [ { id: "eggs", name: "Eggs", type: "single", required: true, options: [
            { id: "two", name: "2 eggs", price: 0 }, { id: "three", name: "3 eggs", price: 30 } ] } ] }
    ]},
    { id: "bites", name: "Indian Bites", items: [
      { id: "vadapav", name: "Vada Pav", price: 90, veg: true, image: "assets/img/vadapav.webp",
        description: "Pune's favourite: spiced potato vada in soft pav with dry garlic and green chutney.", tags: ["Bestseller"],
        addons: [ { id: "extra", name: "Make it yours", type: "multi", required: false, options: [
            { id: "cheese", name: "Cheese slice", price: 25 }, { id: "chilli", name: "Fried green chilli", price: 0 }, { id: "butter", name: "Butter toasted", price: 15 } ] } ] },
      { id: "misal", name: "Kolhapuri Misal Pav", price: 160, veg: true, image: "assets/img/misal.webp",
        description: "Sprouted matki in a fiery kat, topped with farsan, onion and lime. Served with pav.", tags: ["Spicy"],
        addons: [ { id: "spice", name: "Spice level", type: "single", required: true, options: [
            { id: "mild", name: "Mild", price: 0 }, { id: "medium", name: "Medium", price: 0 }, { id: "kolhapuri", name: "Kolhapuri hot", price: 0 } ] },
          { id: "extra", name: "Extras", type: "multi", required: false, options: [
            { id: "pav", name: "Extra pav", price: 20 }, { id: "curd", name: "Dahi", price: 30 } ] } ] },
      { id: "paneertikkasandwich", name: "Paneer Tikka Sandwich", price: 220, veg: true, image: "assets/img/paneertikkasandwich.webp",
        description: "Tandoori paneer, mint mayo and pickled onions, grilled in multigrain bread.", tags: [] },
      { id: "chickenfrankie", name: "Chicken Tikka Frankie", price: 210, veg: false, image: "assets/img/chickenfrankie.webp",
        description: "Smoky chicken tikka, egg-washed paratha, onions and frankie masala.", tags: [] }
    ]},
    { id: "mains", name: "Sandwiches & Bowls", items: [
      { id: "bombaysandwich", name: "Bombay Masala Toast", price: 170, veg: true, image: "assets/img/bombaysandwich.webp",
        description: "Potato masala, beetroot, cucumber and green chutney, grilled with cheese.", tags: [] },
      { id: "chickenburger", name: "Crispy Chicken Burger", price: 290, veg: false, image: "assets/img/chickenburger.webp",
        description: "Buttermilk-fried chicken, peri-peri mayo and slaw in a brioche bun. Served with fries.", tags: ["Bestseller"],
        addons: [ { id: "side", name: "Side", type: "single", required: true, options: [
            { id: "fries", name: "Salted fries", price: 0 }, { id: "periperi", name: "Peri-peri fries", price: 30 }, { id: "salad", name: "Side salad", price: 20 } ] } ] },
      { id: "arrabbiata", name: "Penne Arrabbiata", price: 310, veg: true, image: "assets/img/arrabbiata.webp",
        description: "Slow-cooked tomato, garlic and chilli flakes, finished with parmesan.", tags: [],
        addons: [ { id: "protein", name: "Add protein", type: "single", required: false, options: [
            { id: "paneer", name: "Grilled paneer", price: 70 }, { id: "chicken", name: "Grilled chicken", price: 90 } ] } ] },
      { id: "pestobowl", name: "Pesto Pasta Bowl", price: 330, veg: true, image: "assets/img/pestobowl.webp",
        description: "Pasta tossed in basil pesto with cherry tomatoes and crumbled feta.", tags: ["New"] },
      { id: "butterchickenbowl", name: "Butter Chicken & Naan", price: 360, veg: false, image: "assets/img/butterchickenbowl.webp",
        description: "Classic makhani gravy with a cream swirl, served with butter naan.", tags: [] }
    ]},
    { id: "desserts", name: "Desserts", items: [
      { id: "brownie", name: "Walnut Brownie", price: 160, veg: true, image: "assets/img/brownie.webp",
        description: "Fudgy dark chocolate brownie. Ask to warm it up.", tags: [],
        addons: [ { id: "ice", name: "Make it a sundae", type: "single", required: false, options: [
            { id: "scoop", name: "With vanilla scoop", price: 60 } ] } ] },
      { id: "cheesecake", name: "Mango Cheesecake", price: 240, veg: true, image: "assets/img/cheesecake.webp",
        description: "Baked cheesecake with an Alphonso mango glaze.", tags: ["Seasonal"] },
      { id: "tiramisu", name: "Coffee Tiramisu Jar", price: 220, veg: true, image: "assets/img/tiramisu.webp",
        description: "Mascarpone cream and espresso-soaked sponge, layered in a jar. Eggless.", tags: [] },
      { id: "kulfi", name: "Malai Kulfi", price: 120, veg: true, image: "assets/img/kulfi.webp",
        description: "Slow-reduced malai kulfi, served in scoops with chopped nuts.", tags: [] }
    ]}
  ],
  defaultOutOfStock: ["cheesecake"]
};
