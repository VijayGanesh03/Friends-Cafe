import { ArrowLeft, ArrowRight, Coffee, Leaf, MessageCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FriendsLogo } from "@/components/vj-logo";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
const categories = [
  {
    id: "coffee",
    number: "01",
    title: "Coffee & brews",
    note: "Single-origin coffee, brewed your way.",
    image: "/vj-cafe-barista.webp",
    items: [
      ["Friends Signature Cappuccino", "Double espresso · velvety milk · cocoa", "₹180", "Popular"],
      ["Caramel Cold Brew", "18-hour cold brew · caramel cream", "₹220", "Cold"],
      ["Classic Flat White", "Ristretto · microfoam", "₹190", ""],
      ["Filter Coffee", "South Indian roast · fresh decoction", "₹120", "Local"],
    ],
  },
  {
    id: "plates",
    number: "02",
    title: "Kitchen favourites",
    note: "Comforting plates made fresh to order.",
    image: "/vj-cafe-hero.webp",
    items: [
      ["Wild Mushroom Linguine", "Roasted mushroom · parmesan · herbs", "₹340", "Chef’s pick"],
      ["Farmhouse Breakfast", "Eggs · sourdough · roasted vegetables", "₹320", ""],
      ["Pesto Cottage Cheese Sandwich", "Herb pesto · grilled paneer · greens", "₹280", "Veg"],
      ["Smoked Chicken Croissant", "Tender chicken · mustard cream · lettuce", "₹310", ""],
    ],
  },
  {
    id: "dessert",
    number: "03",
    title: "Sweet endings",
    note: "A little reward, beautifully plated.",
    image: "/vj-cafe-dining.webp",
    items: [
      ["Dark Chocolate Petit", "Cocoa ganache · hazelnut crunch", "₹240", "New"],
      ["Classic Tiramisu", "Espresso · mascarpone · cocoa", "₹260", "Popular"],
      ["Burnt Basque Cheesecake", "Vanilla · berry compote", "₹280", ""],
      ["Warm Brownie", "Dark chocolate · vanilla ice cream", "₹250", ""],
    ],
  },
];

export const metadata = {
  title: "Menu | Friends Cafe Chennai",
  description: "Explore coffee, breakfast, fresh plates and desserts at Friends Cafe Chennai.",
};

export default function MenuPage() {
  const message = encodeURIComponent("Hello Friends Cafe, I would like to know more about your menu and table availability.");
  return (
    <main className="full-menu-page">
      <header className="menu-page-nav">
        <Link href="/" className="menu-brand" aria-label="Friends Cafe home"><FriendsLogo compact /></Link>
        <nav><Link href="/"><ArrowLeft /> Home</Link><a href="#coffee">Coffee</a><a href="#plates">Food</a><a href="#dessert">Desserts</a></nav>
        {WHATSAPP_NUMBER ? <a className="menu-wa" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a> : null}
      </header>

      <section className="menu-page-hero">
        <Image src="/vj-cafe-dining.webp" alt="Dinner at Friends Cafe" fill sizes="100vw" priority />
        <div className="menu-hero-shade" />
        <div><p className="eyebrow"><Sparkles /> The Friends Cafe menu</p><h1>Familiar flavours.<br /><em>A finer feeling.</em></h1><p>From the first coffee of the morning to the final spoon of dessert—everything is made for the moment.</p></div>
      </section>

      <div className="menu-jump">
        <span>Explore</span>{categories.map(category => <a key={category.id} href={`#${category.id}`}>{category.title}</a>)}
      </div>

      {categories.map((category, index) => (
        <section id={category.id} className={`menu-category ${index % 2 ? "reverse" : ""}`} key={category.id}>
          <div className="category-photo"><Image src={category.image} alt={category.title} fill sizes="(max-width: 850px) 100vw, 50vw" /><span>{category.number}</span></div>
          <div className="category-content">
            <p className="eyebrow">{index === 0 ? <Coffee /> : <Leaf />} Friends Cafe selection</p>
            <h2>{category.title}</h2><p className="category-note">{category.note}</p>
            <div className="menu-list">{category.items.map(item => <article key={item[0]}><div><h3>{item[0]}</h3><p>{item[1]}</p></div><div>{item[3] && <span>{item[3]}</span>}<b>{item[2]}</b></div></article>)}</div>
          </div>
        </section>
      ))}

      <section className="menu-bottom-cta"><p className="eyebrow">Ready when you are</p><h2>Found your favourite?</h2><p>Reserve a table and we’ll have the welcome ready.</p><Link href="/#visit">Book your table <ArrowRight /></Link></section>
      <footer className="menu-footer"><Link href="/" className="menu-brand"><FriendsLogo compact /></Link><p>Prices and availability may change. Please check with our team for current specials.</p><small>© 2026 Friends Cafe · Chennai</small></footer>
      {WHATSAPP_NUMBER ? <a className="whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`} target="_blank" rel="noreferrer" aria-label="Chat with Friends Cafe on WhatsApp"><MessageCircle /><span>Chat with us</span></a> : null}
    </main>
  );
}
