import MenuItem from "./MenuItem";

const menu = [
  {
    id: 1,
    name: "Buna",
    price: 80,
    description: "Traditional Ethiopian coffee",
    category: "Drink",
    emoji: "☕",
    image: "/images/buna.jpg",
  },
  {
    id: 2,
    name: "Shiro",
    price: 150,
    description: "Traditional Ethiopian chickpea stew",
    category: "Main",
    emoji: "🍲",
    image: "/images/shiro.jpg",
  },
  {
    id: 3,
    name: "Tibs",
    price: 250,
    description: "Sautéed beef with vegetables",
    category: "Main",
    emoji: "🥩",
    image: "/images/tibs.jpg",
  },
  {
    id: 4,
    name: "Chechebsa",
    price: 120,
    description: "Traditional Ethiopian breakfast with torn flatbread",
    category: "Breakfast",
    emoji: "🥞",
    image: "/images/chechebsa.jpg",
  },
  {
    id: 5,
    name: "Firfir",
    price: 140,
    description: "Injera pieces mixed with berbere sauce",
    category: "Breakfast",
    emoji: "🍛",
    image: "/images/firfir.jpg",
  },
  {
    id: 6,
    name: "Dabo",
    price: 100,
    description: "Traditional Ethiopian homemade bread",
    category: "Breakfast",
    emoji: "🍞",
    image: "/images/dabo.jpg",
  },
  {
    id: 7,
    name: "Beyaynetu",
    price: 220,
    description: "Assorted vegetarian Ethiopian dishes",
    category: "Main",
    emoji: "🥗",
    image: "/images/beyaynetu.jpg",
  },
  {
    id: 8,
    name: "Fetira",
    price: 130,
    description: "Crispy Ethiopian layered flatbread",
    category: "Breakfast",
    emoji: "🥐",
    image: "/images/fetira.jpg",
  },
  {
    id: 9,
    name: "Baklava",
    price: 160,
    description: "Sweet layered pastry with nuts and syrup",
    category: "Dessert",
    emoji: "🍰",
    image: "/images/baklava.jpg",
  },
];

function Menu() {
  return (
    <section className="menu">
      <h2>Our Menu</h2>

      <div className="menu-grid">
        {menu.map((item) => (
          <MenuItem
            key={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            category={item.category}
            emoji={item.emoji}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
}

export default Menu;