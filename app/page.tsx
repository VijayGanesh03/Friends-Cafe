"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Check, ChevronDown, Clock3, Coffee, MapPin, Menu, MessageCircle, Phone, Sparkles, Star, Users, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FriendsLogo } from "@/components/vj-logo";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
const menuItems = [
  { name: "Friends Signature Cappuccino", note: "Single-origin espresso · velvety milk", price: "₹180", tag: "Bestseller", crop: "coffee" },
  { name: "Wild Mushroom Linguine", note: "Roasted mushroom · parmesan · herbs", price: "₹340", tag: "Chef’s pick", crop: "pasta" },
  { name: "Dark Chocolate Petit", note: "Cocoa ganache · hazelnut crunch", price: "₹240", tag: "New", crop: "dessert" },
];
const times = ["09:00 AM", "10:30 AM", "12:00 PM", "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM", "07:30 PM", "09:00 PM"];
const heroSlides = [
  { image: "/vj-cafe-hero.webp", eyebrow: "Chennai’s new café ritual", title: <>Taste the moment.<br /><em>Stay for the feeling.</em></>, copy: "Thoughtfully brewed coffee, comforting plates and a space made for unhurried conversations." },
  { image: "/vj-cafe-barista.webp", eyebrow: "Crafted cup by cup", title: <>Coffee made slowly.<br /><em>Enjoyed completely.</em></>, copy: "Single-origin beans, precise brewing and the small details that turn your everyday coffee into a ritual." },
  { image: "/vj-cafe-dining.webp", eyebrow: "Gather around good food", title: <>Come for dinner.<br /><em>Leave with a memory.</em></>, copy: "Beautiful plates, warm conversations and an evening atmosphere designed to make time feel slower." },
];
const reviews = [
  { quote: "The kind of place you discover once, then keep finding reasons to return to.", name: "Sample guest review", meta: "Replace with a verified Google review" },
  { quote: "Beautiful ambience, genuinely warm service and a cappuccino I was still thinking about the next morning.", name: "Sample guest review", meta: "Replace with a verified Google review" },
  { quote: "Our dinner felt special without feeling formal. Every plate arrived beautifully and tasted even better.", name: "Sample guest review", meta: "Replace with a verified Google review" },
];

function Brand() {
  return <Link href="/" className="brand" aria-label="Friends Cafe home"><FriendsLogo /></Link>;
}

function BookingForm() {
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const [success, setSuccess] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const message = `Hello Friends Cafe, I would like to reserve a table.\n\nName: ${data.get("name")}\nMobile: ${data.get("mobile")}\nDate: ${data.get("date")}\nTime: ${data.get("time")}\nGuests: ${data.get("guests")}\nSeating: ${data.get("seating")}\nOccasion: ${data.get("occasion")}\nSpecial request: ${data.get("message") || "None"}\n\nPlease confirm whether this table is available. Thank you.`;
    setSuccess(true);
    if (WHATSAPP_NUMBER) window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }
  if (success) return <div className="success-panel"><span><Check /></span><p className="eyebrow">Almost done</p><h3>Reservation request prepared.</h3><p>Please send the prepared message in WhatsApp. Our team will confirm your table shortly.</p><button onClick={() => setSuccess(false)} className="text-button">Make another request</button></div>;
  return (
    <form className="booking-form" onSubmit={submit}>
      <label>Full name<input name="name" placeholder="Your name" required /></label>
      <label>Mobile number<input name="mobile" type="tel" placeholder="Your mobile number" pattern="[0-9+ ]{10,16}" required /></label>
      <label><CalendarDays /> Visit date<input name="date" type="date" min={today} required /></label>
      <label><Clock3 /> Preferred time<select name="time" required defaultValue=""><option value="" disabled>Select a time</option>{times.map((time) => <option key={time}>{time}</option>)}</select></label>
      <label><Users /> Guests<select name="guests" defaultValue="2"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6+</option></select></label>
      <label>Seating<select name="seating" defaultValue="No preference"><option>Indoor</option><option>Outdoor</option><option>No preference</option></select></label>
      <label>Occasion<select name="occasion" defaultValue="Casual dining"><option>Casual dining</option><option>Birthday</option><option>Anniversary</option><option>Business meeting</option><option>Other</option></select></label>
      <label className="span-two">Special request<textarea name="message" placeholder="Dietary needs, celebration notes or anything else…" rows={3} /></label>
      <button className="primary-button span-two" type="submit"><MessageCircle /> Confirm via WhatsApp <ArrowRight /></button>
      <p className="form-note span-two">Your request is confirmed by the Friends Cafe team through WhatsApp or phone.</p>
    </form>
  );
}

function BookingDialog({ children }: { children: React.ReactNode }) {
  return <Dialog><DialogTrigger asChild>{children}</DialogTrigger><DialogContent className="booking-dialog max-h-[92vh] overflow-y-auto border-[#c9a568]/30 bg-[#f6f0e4] p-0 sm:max-w-3xl"><DialogHeader className="booking-head"><p className="eyebrow">Your table, your time</p><DialogTitle className="display-font text-4xl font-normal text-[#15251e]">Reserve a table</DialogTitle><DialogDescription className="text-[#5f695f]">Choose when you’re visiting. We’ll confirm availability personally.</DialogDescription></DialogHeader><BookingForm /></DialogContent></Dialog>;
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [review, setReview] = useState(0);
  useEffect(() => {
    const heroTimer = window.setInterval(() => setSlide((current) => (current + 1) % heroSlides.length), 6000);
    const reviewTimer = window.setInterval(() => setReview((current) => (current + 1) % reviews.length), 5000);
    return () => { window.clearInterval(heroTimer); window.clearInterval(reviewTimer); };
  }, []);
  return (
    <main id="home">
      <header className="nav-wrap">
        <Brand />
        <nav id="primary-navigation" className={mobileOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          <a onClick={() => setMobileOpen(false)} href="#story">Our story</a><Link onClick={() => setMobileOpen(false)} href="/menu">Menu <span className="new-page-mark">↗</span></Link><a onClick={() => setMobileOpen(false)} href="#experience">Experience</a><a onClick={() => setMobileOpen(false)} href="#visit">Visit</a>
          <span className="nav-hours">Open daily · 8 AM–11 PM</span>
          <BookingDialog><button className="nav-book">Book a table <ArrowRight /></button></BookingDialog>
        </nav>
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen} aria-controls="primary-navigation">{mobileOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero">
        <div className="hero-slides">{heroSlides.map((item, index) => <Image key={item.image} className={index === slide ? "active" : ""} src={item.image} alt="" aria-hidden={index !== slide} fill sizes="100vw" priority={index === 0} />)}</div><div className="hero-shade" />
        <div className="hero-copy" key={slide}><p className="eyebrow"><Sparkles /> {heroSlides[slide].eyebrow}</p><h1>{heroSlides[slide].title}</h1><p className="hero-lead">{heroSlides[slide].copy}</p><div className="hero-actions"><BookingDialog><button className="primary-button">Reserve your table <ArrowRight /></button></BookingDialog><a href="/menu" className="ghost-button">Explore the menu</a></div></div>
        <div className="slide-controls"><button onClick={() => setSlide((slide - 1 + heroSlides.length) % heroSlides.length)} aria-label="Previous slide"><ArrowLeft /></button><div>{heroSlides.map((item, index) => <button key={item.image} className={index === slide ? "active" : ""} onClick={() => setSlide(index)} aria-label={`Show slide ${index + 1}`} />)}</div><button onClick={() => setSlide((slide + 1) % heroSlides.length)} aria-label="Next slide"><ArrowRight /></button><span>0{slide + 1} / 0{heroSlides.length}</span></div>
        <a href="#story" className="scroll-hint">DISCOVER <ChevronDown /></a>
      </section>

      <section id="story" className="story section-pad">
        <div className="section-number">Since<br />2026</div><div className="story-copy"><p className="eyebrow">More than a café</p><h2>A pause from the city,<br /><em>beautifully served.</em></h2><span className="hand-note">made for slow mornings & long conversations</span></div>
        <div className="story-note"><p>Friends Cafe brings together carefully sourced coffee, generous food and a warm space that feels good at every hour.</p><a href="#experience">Discover our story <ArrowRight /></a></div>
        <div className="story-image image-panel"><Image src="/vj-cafe-hero.webp" alt="Warm evening ambience inside Friends Cafe" fill sizes="(max-width: 900px) 88vw, 65vw" /></div><div className="hours-card"><Coffee /><p>Morning coffee<br />to evening plates</p><b>8 AM — 11 PM</b></div>
      </section>

      <section id="menu" className="menu-section section-pad">
        <div className="menu-heading"><div><p className="eyebrow">A taste of VJ</p><h2>Made with intention.<br /><em>Served with soul.</em></h2></div><p>Familiar favourites, fresh ingredients and just enough surprise to keep you curious.</p></div>
        <div className="menu-grid">{menuItems.map((item, index) => <article className={`menu-card card-${index}`} key={item.name}><div className={`menu-photo ${item.crop}`}><Image src="/vj-cafe-hero.webp" alt={item.name} fill sizes="(max-width: 620px) 88vw, (max-width: 900px) 44vw, 28vw" /><span>{item.tag}</span></div><div className="menu-info"><div><h3>{item.name}</h3><p>{item.note}</p></div><b>{item.price}</b></div></article>)}</div>
        <Link className="outline-button" href="/menu">View full menu <ArrowRight /></Link>
      </section>

      <section id="experience" className="experience"><div className="experience-photo"><Image src="/vj-cafe-hero.webp" alt="Friends Cafe signature dining experience" fill sizes="(max-width: 900px) 100vw, 52vw" /></div><div className="experience-copy"><p className="eyebrow">The Friends Cafe experience</p><h2>Come for coffee.<br /><em>Leave with a memory.</em></h2><p>Quiet mornings, working lunches, slow evenings and everything in between—there’s a corner here with your name on it.</p><ul><li><Check /> Handcrafted beverages</li><li><Check /> Freshly prepared food</li><li><Check /> Work-friendly seating</li><li><Check /> Celebrations & gatherings</li></ul><BookingDialog><button className="primary-button">Find your table <ArrowRight /></button></BookingDialog></div></section>

      <section className="reviews section-pad"><p className="eyebrow">Loved by our guests</p><div className="stars">{[1,2,3,4,5].map(n=><Star key={n} fill="currentColor" />)}</div><div className="review-stage" key={review}><blockquote>“{reviews[review].quote}”</blockquote><p className="reviewer">— {reviews[review].name} · {reviews[review].meta}</p></div><div className="review-dots">{reviews.map((item,index)=><button key={item.quote} className={index===review?"active":""} onClick={()=>setReview(index)} aria-label={`Show review ${index+1}`}/>)}</div></section>

      <section id="visit" className="visit section-pad"><div className="visit-card"><p className="eyebrow">Plan your visit</p><h2>Your favourite table<br /><em>is waiting.</em></h2><div className="visit-details"><div><MapPin /><p><b>Friends Cafe, Chennai</b><br />Your full address will appear here</p></div><div><Clock3 /><p><b>Open every day</b><br />8:00 AM–11:00 PM</p></div>{WHATSAPP_NUMBER ? <div><Phone /><p><b>Call us</b><br />Contact our café team</p></div> : null}</div><BookingDialog><button className="primary-button">Reserve now <ArrowRight /></button></BookingDialog></div><div className="map-card"><div className="map-lines" aria-hidden="true" /><span className="map-pin"><MapPin /></span><p>FRIENDS CAFE</p><a href="https://maps.google.com" target="_blank" rel="noreferrer">Get directions <ArrowRight /></a></div></section>

      <footer><Brand /><p>Good food. Slow moments.<br />Beautiful memories.</p><div className="socials"><a href="#" aria-label="Instagram">IG</a>{WHATSAPP_NUMBER ? <a href={`tel:+${WHATSAPP_NUMBER}`} aria-label="Call"><Phone /></a> : null}</div><small>© 2026 Friends Cafe · Chennai</small></footer>
      {WHATSAPP_NUMBER ? <a className="whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Friends Cafe, I would like to know more about your menu and table availability.")}`} target="_blank" rel="noreferrer" aria-label="Chat with Friends Cafe on WhatsApp"><MessageCircle /><span>Chat with us</span></a> : null}
    </main>
  );
}
