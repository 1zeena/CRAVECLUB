import { useRef, useState } from "react";

type Snack = {
  id: string;
  name: string;
  description: string;
  price: number;
  color: string;
  sauces: string[];
};
const snacks: Snack[] = [
  {
    id: "cookie",
    name: "Cookie Bites",
    description: "Mini chocolate chip cookies. Golden outside, soft inside.",
    price: 4.5,
    color: "#dce9b0",
    sauces: ["Chocolate sauce", "White chocolate", "Caramel", "No sauce"],
  },
  {
    id: "brownie",
    name: "Brownie Bites",
    description:
      "Bite-sized chocolate brownies with crackly tops and fudgy centres.",
    price: 5,
    color: "#dab6c5",
    sauces: ["Chocolate sauce", "White chocolate", "Caramel", "No sauce"],
  },
  {
    id: "fries",
    name: "Japanese Long Fries",
    description: "Extra-long Japanese-style potato fries with a golden crunch.",
    price: 5.5,
    color: "#f3bc7a",
    sauces: ["Hot sauce", "Mayo", "Cheese sauce", "Ketchup", "No sauce"],
  },
  {
    id: "corn",
    name: "Butter Corn",
    description: "Sweet corn kernels tossed in melted butter.",
    price: 4,
    color: "#e9d985",
    sauces: ["Butter", "Spicy mayo", "Cheese sauce", "Hot sauce", "No sauce"],
  },
];
const food = (id: string, width = 800) => {
  const image = ["cookie", "brownie"].includes(id) ? `${id}-chocolate-cup` : id;
  return import.meta.env.DEV
    ? `/img/${image}.png`
    : `/.netlify/images?url=/img/${image}.png&w=${width}&fm=webp&q=85`;
};
const money = (n: number) => `$${n.toFixed(2)}`;
const saucePrice = (sauce: string) => (sauce === "No sauce" ? 0 : 0.5);
function Star({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M50 0 59 32 85 15 68 41 100 50 68 59 85 85 59 68 50 100 41 68 15 85 32 59 0 50 32 41 15 15 41 32Z" />
    </svg>
  );
}
function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
type BagItem = {
  key: string;
  name: string;
  option: string;
  price: number;
  quantity: number;
  id: string;
};
export function MarketingPage() {
  const [bag, setBag] = useState<BagItem[]>([]);
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);
  const [sauces, setSauces] = useState<Record<string, string[]>>({});
  const dialog = useRef<HTMLDialogElement>(null);
  const count = bag.reduce((n, item) => n + item.quantity, 0);
  function add(snack: Snack) {
    setCopied(false);
    const selectedSauces = sauces[snack.id] ?? [];
    const option = selectedSauces.length ? selectedSauces.join(", ") : "No sauce";
    const price = snack.price + selectedSauces.reduce((sum, sauce) => sum + saucePrice(sauce), 0);
    const key = `${snack.id}-${option}`;
    setBag((items) =>
      items.some((i) => i.key === key)
        ? items.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [
            ...items,
            {
              key,
              id: snack.id,
              name: snack.name,
              option,
              price,
              quantity: 1,
            },
          ],
    );
    setNotice(`${snack.name} · ${option} dropped into your box.`);
  }
  function changeQuantity(key: string, delta: number) {
    setCopied(false);
    setBag((items) =>
      items
        .map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + delta } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  }
  return (
    <>
      <a className="skip-link" href="#menu">
        Skip to menu
      </a>
      <header className="header">
        <a className="mini-logo" href="#home" aria-label="Crave Club home">
          CRAVE
          <br />
          CLUB<span>®</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#menu">THE MENU</a>
          <a href="#club">ABOUT US</a>
        </nav>
        <button
          className="bag-button"
          onClick={() => dialog.current?.showModal()}
        >
          YOUR BOX <span>{count}</span>
        </button>
      </header>
      <main>
        <section className="simple-hero" id="home">
          <div className="simple-hero-copy">
            <p className="hero-kicker">A LITTLE BIT OF EVERYTHING YOU CRAVE.</p>
            <h1>
              BIG CRAVINGS.
              <br />
              <span>LITTLE BITES.</span>
            </h1>
            <p>
              {/* Cookie bites, fudgy brownies, Japanese long fries and butter corn.
              Pick your favourites. Make a box that’s all you. */}
            </p>
            <a className="pill dark" href="#menu">
              FILL YOUR BOX <Arrow />
            </a>
          </div>
          <div className="simple-hero-art">
            <img
              className="hero-feast"
              src={food("hero-falling", 1000)}
              alt="Cookie bites, brownie bites, Japanese long fries and golden corn falling through glossy chocolate ribbons"
              width="1000"
              height="1000"
              fetchPriority="high"
            />
            <span className="hero-caption">
              a little sweet. a little salty.
            </span>
          </div>
        </section>
        <section id="menu" className="box-builder">
          <div className="builder-heading">
            <div>
              <p className="hero-kicker">THE MENU</p>
              <h2>FILL YOUR HAPPY BOX.</h2>
            </div>
          </div>
          <div className="builder-layout">
            <div className="snack-grid">
              {snacks.map((item) => {
                const quantity = bag
                  .filter((i) => i.id === item.id)
                  .reduce((n, i) => n + i.quantity, 0);
                return (
                  <article className="snack-card" key={item.id}>
                    <div
                      className="snack-photo"
                      style={{ backgroundColor: item.color }}
                    >
                      <img
                        src={food(item.id, 500)}
                        alt={`${item.name}${["cookie", "brownie"].includes(item.id) ? " with chocolate sauce in a pink cup" : ""}`}
                        loading="lazy"
                        width="500"
                        height="500"
                      />
                      {quantity > 0 && (
                        <span className="in-box">{quantity} in your box</span>
                      )}
                    </div>
                    <div className="snack-card-copy">
                      <div>
                        <h3>{item.name}</h3>
                        <span>{money(item.price)}</span>
                      </div>
                      <p>{item.description}</p>
                      <fieldset className="sauce-picker">
                        <legend>CHOOSE YOUR SAUCES</legend>
                        {item.sauces.map((sauce) => {
                          const checked = (sauces[item.id] ?? []).includes(sauce);
                          return (
                            <label className="sauce-option" key={sauce}>
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() =>
                                  setSauces((current) => {
                                    const selected = current[item.id] ?? [];
                                    const next = sauce === "No sauce"
                                      ? checked ? [] : ["No sauce"]
                                      : checked
                                        ? selected.filter((choice) => choice !== sauce)
                                        : [...selected.filter((choice) => choice !== "No sauce"), sauce];
                                    return { ...current, [item.id]: next };
                                  })
                                }
                              />
                              <span>{sauce}</span>
                              <small>{money(saucePrice(sauce))}</small>
                            </label>
                          );
                        })}
                      </fieldset>
                      {["cookie", "brownie"].includes(item.id) && (
                        <small className="sauce-caption">
                          Chocolate sauce pictured.
                        </small>
                      )}
                      <button className="snack-add" onClick={() => add(item)}>
                        ADD TO BOX <span aria-hidden="true">+</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
            <aside className="box-panel" aria-labelledby="box-heading">
              <div className="box-panel-heading">
                <h3 id="box-heading">YOUR HAPPY BOX</h3>
                <span>
                  {count} {count === 1 ? "snack" : "snacks"}
                </span>
              </div>
              <p>
                {count
                  ? "Looking tasty. Keep mixing it up."
                  : "Your favourites go right here."}
              </p>
              <div className="snack-tray" aria-label="Your selected snacks">
                {bag.map((item) => (
                  <div className="tray-item" key={item.key}>
                    <img
                      src={food(item.id, 240)}
                      alt=""
                      width="120"
                      height="120"
                    />
                    <span>
                      {item.name}
                      <small>{item.option}</small>
                    </span>
                    <div className="quantity">
                      <button
                        aria-label={`Remove one ${item.name} with ${item.option}`}
                        onClick={() => changeQuantity(item.key, -1)}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        aria-label={`Add one ${item.name} with ${item.option}`}
                        onClick={() => changeQuantity(item.key, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                {!count && (
                  <div className="tray-empty">
                    <span aria-hidden="true">+</span>
                    <p>
                      Tap “Add to box”
                      <br />
                      to drop in your first snack.
                    </p>
                  </div>
                )}
              </div>
              <p className="box-notice" role="status">
                {notice }
              </p>
              <div className="box-subtotal">
                <span>Subtotal</span>
                <b>
                  {money(bag.reduce((n, i) => n + i.price * i.quantity, 0))}
                </b>
              </div>
              <button
                className="pill dark"
                disabled={!count}
                onClick={() => dialog.current?.showModal()}
              >
                REVIEW YOUR BOX <Arrow />
              </button>
              <p className="preview-note">
                Just a preview. Sample USD prices.
                <br />
                Online ordering opens soon. No payment is taken.
              </p>
            </aside>
          </div>
          <p className="recipe-note">
            Sauces are $0.50 each; no sauce is $0.00. Recipe and allergen
            details will be confirmed before ordering opens.
          </p>
        </section>
        <section className="simple-club" id="club">
          <Star />
          <div>
            <h2>GOOD FOOD. GOOD COMPANY.</h2>
            <p>
              We’re CRAVE CLUB. A little sweet, a little savoury, and made for
              sharing.
            </p>
          </div>
          <a href="#menu" className="pill dark">
            PICK YOUR FAVOURITES <Arrow />
          </a>
        </section>
      </main>
      <footer>
        <a className="footer-logo" href="#home">
          CRAVE CLUB®
        </a>
        <span>© {new Date().getFullYear()} CRAVE CLUB</span>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
      <dialog
        ref={dialog}
        className="bag-dialog"
        aria-labelledby="bag-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="bag-head">
          <h2 id="bag-title">YOUR HAPPY BOX.</h2>
          <button
            aria-label="Close box"
            onClick={() => dialog.current?.close()}
          >
            ×
          </button>
        </div>
        {bag.length ? (
          <>
            <p className="bag-intro">
              Excellent taste. Here’s your snack lineup.
            </p>
            <div className="bag-items">
              {bag.map((item) => (
                <div className="bag-item" key={item.key}>
                  <img src={food(item.id, 180)} alt="" width="90" height="90" />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.option}</p>
                    <div className="quantity">
                      <button
                        aria-label={`Remove one ${item.name} with ${item.option}`}
                        onClick={() => changeQuantity(item.key, -1)}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        aria-label={`Add one ${item.name} with ${item.option}`}
                        onClick={() => changeQuantity(item.key, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <b>{money(item.price * item.quantity)}</b>
                </div>
              ))}
            </div>
            <div className="bag-total">
              <span>SUBTOTAL</span>
              <b>{money(bag.reduce((n, i) => n + i.price * i.quantity, 0))}</b>
            </div>
            <p className="ordering-note">
              The kitchen is warming up. Online ordering isn’t open yet — this
              box is a preview, and no order or payment is taken.
            </p>
            <button
              className="pill dark"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(
                    bag
                      .map((i) => `${i.quantity} × ${i.name} (${i.option})`)
                      .join("\n"),
                  );
                  setCopied(true);
                } catch {
                  setCopied(false);
                  setNotice(
                    "Copy unavailable in this browser. You can select the box text instead.",
                  );
                }
              }}
            >
              {copied ? "CRAVINGS COPIED ✓" : "COPY YOUR SNACK LIST"} <Arrow />
            </button>
            <p role="status">{notice.startsWith("Copy") ? notice : ""}</p>
          </>
        ) : (
          <div className="empty-bag">
            <Star />
            <h3>
              SO MUCH ROOM
              <br />
              FOR GOOD THINGS.
            </h3>
            <p>Your box is waiting for its first snack.</p>
            <button
              className="pill dark"
              onClick={() => {
                dialog.current?.close();
                document.getElementById("menu")?.scrollIntoView();
              }}
            >
              EXPLORE THE MENU <Arrow />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
