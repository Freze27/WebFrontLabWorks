import { Link } from "react-router-dom";
import Logo from "../../assets/icon/Logo.png";

const footerLinks = [
  {
    title: "About",
    sublinks: [
      { name: "How it works", link: "/#Howitworks" },
      { name: "Featured", link: "/#Featured" },
      { name: "Partnership", link: "/#Partnership" },
      { name: "Bussiness Relation", link: "/#BussinessRelation" },
    ],
  },
  {
    title: "Community",
    sublinks: [
      { name: "Events", link: "/#Events" },
      { name: "Blog", link: "/#Blog" },
      { name: "Podcast", link: "/#Podcast" },
      { name: "Invite a friend", link: "/#Inviteafriend" },
    ],
  },
  {
    title: "Socials",
    sublinks: [
      { name: "Discord", link: "/#Discord" },
      { name: "Instagram", link: "/#Instagram" },
      { name: "Twitter", link: "/#Twitter" },
      { name: "Facebook", link: "/#Facebook" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white-0 dark:bg-gray-900">
      <div className="mx-auto p-6 md:px-[60px] md:pb-[60px] md:pt-20 lg:max-w-[1536px]">
        <section className="flex w-full flex-col md:flex-row md:justify-between md:pb-[60px]">
          <article className="inline-flex w-[216px] flex-col items-start justify-start gap-4 md:w-[292px]">
            <h2 className="text-2xl font-bold leading-[28.80px] text-blue-500 md:text-[32px] md:leading-[38.40px]">
              MORENT
            </h2>
            <p className="text-xs font-medium leading-normal text-gray-400 dark:text-white-200 md:text-base md:leading-loose">
              Our vision is to provide convenience and help increase your sales business.
            </p>
          </article>

          <div className="flex flex-wrap gap-16 pt-12 md:flex-nowrap md:pt-0">
            {footerLinks.map((item) => (
              <section
                key={item.title}
                className="inline-flex flex-col items-start justify-start gap-[1.5rem]"
              >
                <h3 className="text-xl font-semibold leading-normal text-gray-900 dark:text-white-100">
                  {item.title}
                </h3>
                <div className="flex flex-col gap-5">
                  {item.sublinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.link}
                      className="text-base font-medium leading-tight text-gray-400 dark:text-white-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="mt-10 flex flex-col border-blue-50 py-10 text-xs font-semibold leading-normal text-gray-900 dark:text-white-100 md:flex-row md:justify-between md:border-t md:text-base md:leading-loose">
          <p>©2022 MORENT. All rights reserved</p>

          <div className="flex justify-between gap-10 max-sm:mt-4">
            <Link to="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              Privacy & Policy
            </Link>
            <Link to="/" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              Terms & Condition
            </Link>
          </div>
        </section>
      </div>
    </footer>
  );
}
