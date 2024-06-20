import React from "react";
import Navbar from "../../layouts/player/Navbar.jsx";
import Footer from "../../components/layout/Footer.js";
// import styleLandingPage from '../../style/landing-page.css';
// import '../../style/landing-page.css';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-10 overflow-hidden text-center text-white text-opacity-80 md:pt-20 bg-blue-400">
          <div className="max-w-screen-sm mx-auto">
            <div>
              <h1 className="text-4xl font-bold mt-0">
                Landing template for startups
              </h1>
              <p className="mt-4">
                Our landing page template works for all the devices, so you only
                have to set it up once, and get beautiful results forever.
              </p>
              <p className="mt-6">
                <a
                  className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700"
                  href="#"
                >
                  Get started now
                </a>
              </p>
              <div className="mt-8" />
            </div>
          </div>
        </section>

        <section className="isolate block text-center">
          <div className="container">
            <div className="relative pt-3 pb-12 md:pt-20 md:pb-20">
              <h2 className="mb-12 md:mb-4 mt-0 font-bold text-2xl leading-10 tracking-[-0.1px] md:text-3xl md:leading-[46px] md:tracking-[-0.2px]">
                Product features
              </h2>
              <div className="flex flex-wrap justify-center mx-[-3px] last:mb-[-3px]">
                <div className="p-3 w-[276px] max-w-[276px] flex-grow">
                  <div className="relative h-full bg-white p-3 py-6 shadow-2xl">
                    <div className="flex justify-center">
                      <svg
                        width={48}
                        height={48}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="none" fillRule="evenodd">
                          <path fill="#84E482" d="M48 16v32H16z" />
                          <path fill="#0EB3CE" d="M0 0h32v32H0z" />
                        </g>
                      </svg>
                    </div>
                    <h4 className="mt-6 mb-1 font-bold text-lg leading-7 tracking-[-0.1px] md:text-xl md:leading-8 md:tracking-[-0.1px]">
                      Lorem Ipsum
                    </h4>
                    <p className="text-lg leading-7 tracking-[-0.1px] mt-0 mb-6">
                      often arouses curiosity due to its resemblance to
                      classical latin
                    </p>
                  </div>
                </div>
                <div className="p-3 w-[276px] max-w-[276px] flex-grow">
                  <div className="relative h-full bg-white p-3 py-6 shadow-2xl">
                    <div className="flex justify-center">
                      <svg
                        width={48}
                        height={48}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="none" fillRule="evenodd">
                          <path fill="#84E482" d="M48 16v32H16z" />
                          <path fill="#0EB3CE" d="M0 0v32h32z" />
                          <circle fill="#02C6A4" cx={29} cy={9} r={4} />
                        </g>
                      </svg>
                    </div>
                    <h4 className="mt-6 mb-1 font-bold text-lg leading-7 tracking-[-0.1px] md:text-xl md:leading-8 md:tracking-[-0.1px]">
                      Lorem Ipsum
                    </h4>
                    <p className="text-lg leading-7 tracking-[-0.1px] mt-0 mb-6">
                      often arouses curiosity due to its resemblance to
                      classical latin
                    </p>
                  </div>
                </div>
                <div className="p-3 w-[276px] max-w-[276px] flex-grow">
                  <div className="relative h-full bg-white p-3 py-6 shadow-2xl">
                    <div className="flex justify-center">
                      <svg
                        width={48}
                        height={48}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="none" fillRule="evenodd">
                          <path fill="#0EB3CE" d="M0 0h32v32H0z" />
                          <path fill="#84E482" d="M16 16h32L16 48z" />
                        </g>
                      </svg>
                    </div>
                    <h4 className="mt-6 mb-1 font-bold text-lg leading-7 tracking-[-0.1px] md:text-xl md:leading-8 md:tracking-[-0.1px]">
                      Lorem Ipsum
                    </h4>
                    <p className="text-lg leading-7 tracking-[-0.1px] mt-0 mb-6">
                      often arouses curiosity due to its resemblance to
                      classical latin
                    </p>
                  </div>
                </div>
                <div className="p-3 w-[276px] max-w-[276px] flex-grow">
                  <div className="relative h-full bg-white p-3 py-6 shadow-2xl">
                    <div className="flex justify-center">
                      <svg
                        width={48}
                        height={48}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g fill="none" fillRule="evenodd">
                          <path
                            d="M32 40H0c0-8.837 7.163-16 16-16s16 7.163 16 16z"
                            fill="#84E482"
                            style={{ mixBlendMode: "multiply" }}
                          />
                          <path fill="#03C5A4" d="M12 8h8v8h-8z" />
                          <path fill="#0EB3CE" d="M32 0h16v48H32z" />
                        </g>
                      </svg>
                    </div>
                    <h4 className="mt-6 mb-1 font-bold text-lg leading-7 tracking-[-0.1px] md:text-xl md:leading-8 md:tracking-[-0.1px]">
                      Lorem Ipsum
                    </h4>
                    <p className="text-lg leading-7 tracking-[-0.1px] mt-0 mb-6">
                      often arouses curiosity due to its resemblance to
                      classical latin
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="block">
          <div className="container">
            <div className="py-3 md:py-4 relative mx-40">
              <div className="text-center">
                <div className="container mx-auto px-6 sm:px-0 max-w-[800px] sm:max-w-[848px]">
                  <h2 className="mt-0 mb-4 font-bold text-3xl leading-10 tracking-[-0.1px] sm:text-4xl sm:leading-[46px] sm:tracking-[-0.2px]">
                    Meet Evelyn
                  </h2>
                  <p className="sm:px-[72px] sm:mb-0 mt-0 mb-6">
                    Lorem ipsum is common placeholder text used to demonstrate
                    the graphic elements of a document or visual presentation
                  </p>
                </div>
              </div>
              <div className="pt-3 md:pt-4 md:flex md:items-center md:py-3 lg:px-4">
                <div className="md:order-1 md:w-auto md:p-6">
                  <svg
                    width={480}
                    height={360}
                    viewBox="0 0 480 360"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <filter
                        x="-500%"
                        y="-500%"
                        width="1000%"
                        height="1000%"
                        filterUnits="objectBoundingBox"
                        id="dropshadow-1"
                      >
                        <feOffset
                          dy={16}
                          in="SourceAlpha"
                          result="shadowOffsetOuter"
                        />
                        <feGaussianBlur
                          stdDeviation={24}
                          in="shadowOffsetOuter"
                          result="shadowBlurOuter"
                        />
                        <feColorMatrix
                          values="0 0 0 0 0.12 0 0 0 0 0.17 0 0 0 0 0.21 0 0 0 0.2 0"
                          in="shadowBlurOuter"
                        />
                      </filter>
                    </defs>
                    <path fill="#F6F8FA" d="M0 220V0h200zM480 140v220H280z" />
                    <path
                      fill="#FFF"
                      d="M40 50h400v260H40z"
                      style={{
                        mixBlendMode: "multiply",
                        filter: "url(#dropshadow-1)",
                      }}
                    />
                    <path fill="#FFF" d="M40 50h400v260H40z" />
                    <path
                      fill="#FFF"
                      d="M103 176h80v160h-80zM320 24h88v88h-88z"
                      style={{
                        mixBlendMode: "multiply",
                        filter: "url(#dropshadow-1)",
                      }}
                    />
                    <path
                      fill="#FFF"
                      d="M103 176h80v160h-80zM320 24h88v88h-88z"
                    />
                    <path
                      fill="#FFF"
                      d="M230.97 198l16.971 16.971-16.97 16.97L214 214.972z"
                      style={{
                        mixBlendMode: "multiply",
                        filter: "url(#dropshadow-1)",
                      }}
                    />
                    <path
                      fill="#02C6A4"
                      d="M230.97 198l16.971 16.971-16.97 16.97L214 214.972z"
                    />
                    <path
                      fill="#FFF"
                      d="M203 121H103v100z"
                      style={{
                        mixBlendMode: "multiply",
                        filter: "url(#dropshadow-1)",
                      }}
                    />
                    <path fill="#84E482" d="M203 121H103v100z" />
                    <circle
                      fill="#FFF"
                      cx={288}
                      cy={166}
                      r={32}
                      style={{
                        mixBlendMode: "multiply",
                        filter: "url(#dropshadow-1)",
                      }}
                    />
                    <circle
                      fill="#0EB3CE"
                      cx={288}
                      cy={166}
                      r={32}
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </svg>
                </div>
                <div className="lg:text-left text-center lg:px-40 md:px-24 px-4">
                  <h3 className="mt-0 mb-5 font-bold text-2xl sm:text-3xl leading-10 sm:leading-14 tracking-tighter sm:tracking-normal">
                    Discover
                  </h3>
                  <p className="mt-0 mb-6">
                    Where text is visible, people tend to focus on the textual
                    content rather than upon overall presentation
                  </p>
                </div>
              </div>
              <div className="pt-3 md:pt-4 md:flex md:items-center md:py-3 lg:px-4">
                <div className="md:mb-0 md:w-auto md:p-6 lg:p-3">
                  <svg
                    width={480}
                    height={360}
                    viewBox="0 0 480 360"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <filter
                        x="-500%"
                        y="-500%"
                        width="1000%"
                        height="1000%"
                        filterUnits="objectBoundingBox"
                        id="dropshadow-2"
                      >
                        <feOffset
                          dy={16}
                          in="SourceAlpha"
                          result="shadowOffsetOuter"
                        />
                        <feGaussianBlur
                          stdDeviation={24}
                          in="shadowOffsetOuter"
                          result="shadowBlurOuter"
                        />
                        <feColorMatrix
                          values="0 0 0 0 0.12 0 0 0 0 0.17 0 0 0 0 0.21 0 0 0 0.2 0"
                          in="shadowBlurOuter"
                        />
                      </filter>
                    </defs>
                    <path fill="#F6F8FA" d="M480 140v220H280zM0 220V0h200z" />
                    <path
                      fill="#FFF"
                      d="M40 50h400v260H40z"
                      style={{
                        mixBlendMode: "multiply",
                        filter: "url(#dropshadow-2)",
                      }}
                    />
                    <path fill="#FFF" d="M40 50h400v260H40z" />
                    <path
                      fill="#FFF"
                      d="M86.225 161l62.226 62.225-62.226 62.225L24 223.225zM296 176h80v160h-80z"
                      style={{
                        mixBlendMode: "multiply",
                        filter: "url(#dropshadow-2)",
                      }}
                    />
                    <path
                      fill="#FFF"
                      d="M86.225 161l62.226 62.225-62.226 62.225L24 223.225zM296 176h80v160h-80z"
                    />
                    <path
                      fill="#FFF"
                      d="M245.092 218l9.378 22.092-22.093 9.378L223 227.378z"
                      style={{
                        mixBlendMode: "multiply",
                        filter: "url(#dropshadow-2)",
                      }}
                    />
                    <path
                      fill="#02C6A4"
                      d="M245.092 218l9.378 22.092-22.093 9.378L223 227.378z"
                    />
                    <path
                      fill="#FFF"
                      d="M270 96H170v100z"
                      style={{
                        mixBlendMode: "multiply",
                        filter: "url(#dropshadow-2)",
                      }}
                    />
                    <path fill="#84E482" d="M270 96H170v100z" />
                    <circle
                      fill="#FFF"
                      cx={296}
                      cy={177}
                      r={32}
                      style={{
                        mixBlendMode: "multiply",
                        filter: "url(#dropshadow-2)",
                      }}
                    />
                    <circle
                      fill="#0EB3CE"
                      cx={296}
                      cy={177}
                      r={32}
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </svg>
                </div>
                <div className="lg:text-left text-center lg:px-40 md:px-24 px-4">
                  <h3 className="mt-0 mb-5 font-bold text-2xl sm:text-3xl leading-10 sm:leading-14 tracking-tighter sm:tracking-normal">
                    Discover
                  </h3>
                  <p className="mt-0 mb-6">
                    Where text is visible, people tend to focus on the textual
                    content rather than upon overall presentation
                  </p>
                </div>
              </div>
              <div className="pt-3 md:pt-4 md:flex md:items-center md:py-3 lg:px-4">
                <div className="md:order-1 md:w-auto md:p-6">
                  <svg
                    width={480}
                    height={360}
                    viewBox="0 0 480 360"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <filter
                        x="-500%"
                        y="-500%"
                        width="1000%"
                        height="1000%"
                        filterUnits="objectBoundingBox"
                        id="dropshadow-3"
                      >
                        <feOffset
                          dy={16}
                          in="SourceAlpha"
                          result="shadowOffsetOuter"
                        />
                        <feGaussianBlur
                          stdDeviation={24}
                          in="shadowOffsetOuter"
                          result="shadowBlurOuter"
                        />
                        <feColorMatrix
                          values="0 0 0 0 0.12 0 0 0 0 0.17 0 0 0 0 0.21 0 0 0 0.2 0"
                          in="shadowBlurOuter"
                        />
                      </filter>
                    </defs>
                    <path fill="#F6F8FA" d="M480 140v220H280zM0 220V0h200z" />
                    <path
                      fill="#FFF"
                      d="M40 50h400v260H40z"
                      style={{
                        mixBlendMode: "multiply",
                        filter: "url(#dropshadow-3)",
                      }}
                    />
                    <path fill="#FFF" d="M40 50h400v260H40z" />
                    <path
                      fill="#FFF"
                      d="M72 248h88v88H72zM180 24h80v160h-80z"
                      style={{
                        mixBlendMode: "multiply",
                        filter: "url(#dropshadow-3)",
                      }}
                    />
                    <path
                      fill="#FFF"
                      d="M72 248h88v88H72zM180 24h80v160h-80z"
                    />
                    <path
                      fill="#FFF"
                      d="M277.664 261.919l-18.113 15.745-15.746-18.113 18.113-15.745z"
                      style={{
                        mixBlendMode: "multiply",
                        filter: "url(#dropshadow-3)",
                      }}
                    />
                    <path
                      fill="#02C6A4"
                      d="M277.664 261.919l-18.113 15.745-15.746-18.113 18.113-15.745z"
                    />
                    <path
                      fill="#FFF"
                      d="M315 129H215v100z"
                      style={{
                        mixBlendMode: "multiply",
                        filter: "url(#dropshadow-3)",
                      }}
                    />
                    <path fill="#84E482" d="M315 129H215v100z" />
                    <circle
                      fill="#FFF"
                      cx={318}
                      cy={219}
                      r={32}
                      style={{
                        mixBlendMode: "multiply",
                        filter: "url(#dropshadow-3)",
                      }}
                    />
                    <circle
                      fill="#0EB3CE"
                      cx={318}
                      cy={219}
                      r={32}
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </svg>
                </div>
                <div className="lg:text-left text-center lg:px-40 md:px-24 px-4">
                  <h3 className="mt-0 mb-5 font-bold text-2xl sm:text-3xl leading-10 sm:leading-14 tracking-tighter sm:tracking-normal">
                    Discover
                  </h3>
                  <p className="mt-0 mb-6">
                    Where text is visible, people tend to focus on the textual
                    content rather than upon overall presentation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="block">
          <div className="container">
            <div className="relative py-12 sm:py-20">
              <h2 className="sm:mb-16 mt-0 text-center text-3xl sm:text-4xl leading-10 sm:leading-[46px] tracking-[-0.1px] sm:tracking-[-0.2px]">
                Pricing
              </h2>
              <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-8 md:gap-x-12">
                <div className="p-4 w-[344px] max-w-[344px] flex-grow shadow-2xl">
                  <div className="relative flex flex-wrap bg-white p-2 h-full">
                    <div className="relative w-full">
                      <div className="relative">
                        <div className="mb-4 text-teal-500 text-xl">
                          Lorem ipsum
                        </div>
                        <div className="mb-6 pb-8">
                          <span className="mt-0 mb-5 font-bold text-2xl sm:text-3xl leading-10 sm:leading-14 tracking-tighter sm:tracking-normal">
                            $
                          </span>
                          <span className="text-4xl font-bold mt-0">29</span>
                        </div>
                      </div>
                      <ul className="list-none p-0 text-xs mb-4">
                        <li className="flex items-center mb-4">
                          <span className="inline-flex w-4 h-3 mr-3">
                            <svg
                              width={16}
                              height={12}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.3.3L5 9.6 1.7 6.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"
                                fill="#00C6A7"
                                fillRule="nonzero"
                              />
                            </svg>
                          </span>
                          <span>Sed do eiusmod tempor cesa.</span>
                        </li>
                        <li className="flex items-center mb-4">
                          <span className="inline-flex w-4 h-3 mr-3">
                            <svg
                              width={16}
                              height={12}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.3.3L5 9.6 1.7 6.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"
                                fill="#00C6A7"
                                fillRule="nonzero"
                              />
                            </svg>
                          </span>
                          <span>Sed do eiusmod tempor cesa.</span>
                        </li>
                        <li className="flex items-center mb-4">
                          <span className="inline-flex w-4 h-3 mr-3">
                            <svg
                              width={16}
                              height={12}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.3.3L5 9.6 1.7 6.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"
                                fill="#00C6A7"
                                fillRule="nonzero"
                              />
                            </svg>
                          </span>
                          <span>Sed do eiusmod tempor cesa.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="relative w-full flex self-end">
                      <button
                        className="bg-gradient-to-r from-teal-600 to-cyan-400 text-white transition duration-150 ease-in-out text-sm cursor-pointer w-full justify-center inline-flex items-center font-semibold uppercase tracking-wider focus:outline-none rounded-md px-8 py-4"
                        href="#"
                      >
                        Get started now
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4 w-[344px] max-w-[344px] flex-grow shadow-2xl">
                  <div className="relative flex flex-wrap bg-white p-2 h-full">
                    <div className="relative w-full">
                      <div className="relative">
                        <div className="mb-4 text-teal-500 text-xl">
                          Lorem ipsum
                        </div>
                        <div className="mb-6 pb-8">
                          <span className="mt-0 mb-5 font-bold text-2xl sm:text-3xl leading-10 sm:leading-14 tracking-tighter sm:tracking-normal">
                            $
                          </span>
                          <span className="text-4xl font-bold mt-0">129</span>
                        </div>
                      </div>
                      <ul className="list-none p-0 text-xs mb-4">
                        <li className="flex items-center mb-4">
                          <span className="inline-flex w-4 h-3 mr-3">
                            <svg
                              width={16}
                              height={12}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.3.3L5 9.6 1.7 6.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"
                                fill="#00A2B8"
                                fillRule="nonzero"
                              />
                            </svg>
                          </span>
                          <span>Sed do eiusmod tempor cesa.</span>
                        </li>
                        <li className="flex items-center mb-4">
                          <span className="inline-flex w-4 h-3 mr-3">
                            <svg
                              width={16}
                              height={12}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.3.3L5 9.6 1.7 6.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"
                                fill="#00A2B8"
                                fillRule="nonzero"
                              />
                            </svg>
                          </span>
                          <span>Sed do eiusmod tempor cesa.</span>
                        </li>
                        <li className="flex items-center mb-4">
                          <span className="inline-flex w-4 h-3 mr-3">
                            <svg
                              width={16}
                              height={12}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.3.3L5 9.6 1.7 6.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"
                                fill="#00A2B8"
                                fillRule="nonzero"
                              />
                            </svg>
                          </span>
                          <span>Sed do eiusmod tempor cesa.</span>
                        </li>
                        <li className="flex items-center mb-4">
                          <span className="inline-flex w-4 h-3 mr-3">
                            <svg
                              width={16}
                              height={12}
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.3.3L5 9.6 1.7 6.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"
                                fill="#00A2B8"
                                fillRule="nonzero"
                              />
                            </svg>
                          </span>
                          <span>Sed do eiusmod tempor cesa.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="relative w-full flex self-end">
                      <button
                        className="bg-gradient-to-r from-teal-600 to-cyan-400 text-white transition duration-150 ease-in-out text-sm cursor-pointer w-full justify-center inline-flex items-center px-8 py-4 font-semibold uppercase tracking-wider focus:outline-none rounded-md"
                        href="#"
                      >
                        Get started now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
