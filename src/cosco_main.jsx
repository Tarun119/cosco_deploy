import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

// Simple emoji icons
const Airplane = ({ className = "" }) => <span className={`${className} inline-block text-xl`} role="img">✈️</span>;
const MapPin = ({ className = "" }) => <span className={`${className} inline-block text-xl`} role="img">📍</span>;
const Bus = ({ className = "" }) => <span className={`${className} inline-block text-xl`} role="img">🚌</span>;
const ShieldCheck = ({ className = "" }) => <span className={`${className} inline-block text-xl`} role="img">🛡️</span>;
const FileText = ({ className = "" }) => <span className={`${className} inline-block text-xl`} role="img">📄</span>;
const CreditCard = ({ className = "" }) => <span className={`${className} inline-block text-xl`} role="img">💳</span>;
const Zap = ({ className = "" }) => <span className={`${className} inline-block text-xl`} role="img">⚡</span>;
const Mail = ({ className = "" }) => <span className={`${className} inline-block text-xl`} role="img">✉️</span>;
const Phone = ({ className = "" }) => <span className={`${className} inline-block text-xl`} role="img">📞</span>;
const X = ({ className = "" }) => <span className={`${className} inline-block text-xl`} role="img">✖️</span>;

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [head, setHead] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});

  // ✅ Grouped services
  const groupedServices = [
    {
      category: "Travel Services",
      items: [
        { id: "flight", title: "Flight Bookings", desc: "Submit your flight booking queries and we'll arrange tickets.", icon: <Airplane className="w-6 h-6" /> },
        { id: "train", title: "Train Bookings", desc: "Submit your train travel details (date, from, to, class) and we'll arrange the tickets.", icon: <MapPin className="w-6 h-6" /> },
        { id: "bus", title: "Bus Bookings", desc: "We handle your bus ticket queries.", icon: <Bus className="w-6 h-6" /> },
        { id: "visa", title: "Visa Services", desc: "We assist with visa application and documentation for travel abroad.", icon: <FileText className="w-6 h-6" /> },
      ],
    },
    {
      category: "Documents & Other Services",
      items: [
        { id: "insurance", title: "Insurance (Car / Two Wheeler / Health)", desc: "We assist with insurance-related queries.", icon: <ShieldCheck className="w-6 h-6" /> },
        { id: "passport", title: "Passport Services", desc: "We guide and assist you with passport application queries.", icon: <FileText className="w-6 h-6" /> },
        { id: "pan", title: "PAN Card Services", desc: "Help with new PAN applications, corrections, or related support.", icon: <CreditCard className="w-6 h-6" /> },
        { id: "money", title: "Money Transfer", desc: "Send and receive money safely with our assistance.", icon: <Zap className="w-6 h-6" /> },
        { id: "bills", title: "Utility & Bill Payments", desc: "Electricity bills, credit card bills, and other utility payments handled for you.", icon: <CreditCard className="w-6 h-6" /> },
        { id: "kyc", title: "Paytm KYC Assistance", desc: "Get help completing or updating your Paytm KYC quickly.", icon: <FileText className="w-6 h-6" /> },
        { id: "fastag", title: "FASTag Services", desc: "Apply for new FASTag or recharge existing FASTag easily.", icon: <CreditCard className="w-6 h-6" /> },
        { id: "lifeCertificate", title: "Life Certificate (Jeevan Pramaan)", desc: "Get assistance in generating Digital Life Certificate for pensioners.", icon: <ShieldCheck className="w-6 h-6" /> },
        { id: "voterId", title: "Voter ID Services", desc: "Apply for new Voter ID or request corrections in existing Voter ID.", icon: <FileText className="w-6 h-6" /> },
        { id: "dl", title: "Driving Licence Services", desc: "Apply for new Driving Licence or renew an existing one.", icon: <FileText className="w-6 h-6" /> },
      ],
    },
  ];

  function openForm(selectedHead = "") { setHead(selectedHead); setIsOpen(true); }
  function closeForm() { setIsOpen(false); setHead(""); setForm({ name: "", email: "", phone: "", message: "" }); }
  function handleChange(e) { const { name, value } = e.target; setForm((s) => ({ ...s, [name]: value })); }

  function validateForm() {
    let newErrors = {};

    if (!/^[A-Za-z\s]{2,}$/.test(form.name.trim())) {
      newErrors.name = "Please enter a valid name (letters only).";
    }
    if (!/^\d{10,15}$/.test(form.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number (10–15 digits).";
    }
    if (form.message.trim() && form.message.trim().length < 5) {
      newErrors.message = "Message must be at least 5 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const templateParams = {
      head,
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    };

    emailjs.send("service_186y4aa", "template_wmxkpi7", templateParams, "UG03rybCsybl_73CL")
      .then(() => {
        alert("Thanks! Your query was submitted. We'll contact you soon.");
        closeForm();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Sorry, something went wrong. Please try again.");
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <header className="max-w-6xl mx-auto p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 text-white rounded-2xl px-3 py-2 font-bold text-lg">Cosco travels</div>
          <div className="text-sm text-slate-600">We make travel & documents simple.</div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => openForm("")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Send a Query
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Cosco travels</h1>
            <p className="mt-4 text-lg text-slate-600">You send us a travel or document query — we handle booking & paperwork for you.</p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => openForm("general")}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                Submit a Query
              </button>
              <a
                href="#services"
                className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 hover:scale-105 transition-all duration-200"
              >
                Our Services
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold">Why choose us?</h3>
            <ul className="mt-4 space-y-3 text-slate-600 text-sm">
              <li>- Simple single-query form — no multiple forms per service.</li>
              <li>- Assistance for travel, insurance, documents, and bill payments.</li>
              <li>- Transparent communication and confirmation before booking.</li>
            </ul>
          </motion.div>
        </section>

        {/* ✅ Services Section */}
        <section id="services" className="mt-12">
          <h2 className="text-2xl font-bold">Services we provide</h2>
          <p className="text-slate-600 mt-2">Click any service to learn more — use the single query form to submit your request.</p>

          {groupedServices.map((group) => (
            <div key={group.category} className="mt-8">
              <h3 className="text-xl font-semibold mb-4">{group.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {group.items.map((s) => (
                  <motion.article
                    key={s.id}
                    whileHover={{ y: -6, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className="group bg-white p-6 rounded-2xl shadow flex gap-4 items-start hover:shadow-xl hover:border hover:border-indigo-100 transition-all duration-200"
                  >
                    <div className="p-3 rounded-lg bg-indigo-50 text-indigo-700 transition-transform duration-200 group-hover:rotate-6 group-hover:scale-110">
                      {s.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{s.title}</h4>
                      <p className="text-slate-600 text-sm mt-2">{s.desc}</p>
                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() => openForm(s.title)}
                          className="text-indigo-600 underline text-sm hover:text-indigo-800 transition-colors"
                        >
                          Submit a query for this
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section id="contact" className="mt-12 bg-white p-6 rounded-2xl shadow">
          <h3 className="text-2xl font-bold">Contact Us</h3>
          <p className="text-slate-600 mt-2">Get in touch with us for queries and assistance:</p>
          <div className="mt-4 space-y-2 text-slate-700">
            <p><MapPin className="inline-block mr-2" /> Aakash Plaza, 84 A/G-17, Main Road, Rajendra Nagar Sector 5, Sahibabad, Ghaziabad, Uttar Pradesh 201005, India</p>
            <p><Phone className="inline-block mr-2" /> <a href="tel:+919971890101" className="text-indigo-600 hover:underline">+91 99718 90101</a></p>
            <p><Mail className="inline-block mr-2" /> <a href="mailto:coscotravels@gmail.com" className="text-indigo-600 hover:underline">coscotravels@gmail.com</a></p>
          </div>

          <div className="mt-6 rounded-2xl overflow-hidden shadow-lg h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.866127282244!2d77.35495407549843!3d28.634306375661376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb60c9ae2f33%3A0xd8e6c18ef8b24a2c!2sCosco%20Travels!5e0!3m2!1sen!2sin!4v1694545600000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </section>

        <footer className="mt-12 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} CoscoTravels | All rights reserved
        </footer>
      </main>
      
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeForm}></div>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.18 }}
            className="relative bg-white max-w-xl w-full rounded-2xl p-6 shadow-xl mx-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold">Submit your query</h4>
                <div className="text-slate-500 text-sm mt-1">Head: {head || "Select a head"}</div>
              </div>
              <button
                onClick={closeForm}
                className="p-2 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-3">
              <label className="text-sm text-slate-600">What do you need?</label>
              <select
                value={head}
                onChange={(e) => setHead(e.target.value)}
                className="w-full p-3 border rounded-lg hover:border-indigo-400 transition-colors"
                required
              >
                <option value="">-- Choose a category --</option>
                {groupedServices.map((group) => (
                  <optgroup key={group.category} label={group.category}>
                    {group.items.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                  </optgroup>
                ))}
              </select>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className={`w-full p-3 border rounded-lg hover:border-indigo-400 transition-colors ${errors.name ? "border-red-500" : ""}`}
                required
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email (optional)"
                  className="w-full p-3 border rounded-lg hover:border-indigo-400 transition-colors"
                  type="email"
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone / WhatsApp number"
                  className={`w-full p-3 border rounded-lg hover:border-indigo-400 transition-colors ${errors.phone ? "border-red-500" : ""}`}
                  required
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your query..."
                className={`w-full p-3 border rounded-lg h-28 hover:border-indigo-400 transition-colors ${errors.message ? "border-red-500" : ""}`}
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 rounded-lg border hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                >
                  Submit Query
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
