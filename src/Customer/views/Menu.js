import React, { useState, useEffect } from "react";
import Base from "../Base.js";
import { getMenu, getCategory } from "../Helpers/index.js";
import MenuItem from "../components/MenuItem.js";
import LoadingSVG from "../assets/loading.svg";

export default function Menu() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [filterOption, setFilterOption] = useState({
    category: "",
    type: "",
  });
  const [reload, setReload] = useState(false);
  const { category, type } = filterOption;

  useEffect(() => {
    getMenu(category, type).then((data) => {
      setMenus(data);
      // console.log(data);
      setLoading(false);
    });

    getCategory().then((data) => {
      setCategories(data);
    });
  }, [reload]);

  const popMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <Base>
      <section className="relative py-16 bg-gray-300">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                {/* <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={require("../assets/img/team-2-800x800.jpg")}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                        style={{ maxWidth: "150px" }}
                      />
                    </div>
                  </div> */}
                {/* <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        Connect
                      </button>
                    </div>
                  </div> */}
                {categories.length > 0 && (
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <div className="inline-block relative">
                          <select
                            onChange={(e) => {
                              setFilterOption({
                                ...filterOption,
                                category: e.target.value,
                              });
                              setReload(!reload);
                            }}
                            className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          >
                            <option value="">All Category</option>
                            {categories.map((category, index) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                            {/* <option>Option 3</option> */}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <div className="inline-block relative">
                          <select
                            onChange={(e) => {
                              setFilterOption({
                                ...filterOption,
                                type: e.target.value,
                              });
                              setReload(!reload);
                            }}
                            className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          >
                            <option value="">All Type</option>
                            <option value="V">Veg</option>
                            <option value="NV">Non-Veg</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {loading && (
                <div className="w-full flex justify-center my-4">
                  <img
                    className="w-10 h-10"
                    src={LoadingSVG}
                    alt="Loading..."
                  />
                </div>
              )}
              <div className="flex flex-wrap justify-center">
                {/* <div className="w-full lg:w-4/12 px-4 lg:order-1"> */}
                {/* <div className="flex justify-center py-4 lg:pt-4 pt-8"> */}
                {menus.length > 0 &&
                  menus.map((menu, index) => (
                    <MenuItem
                      key={menu.id}
                      id={menu.id}
                      name={menu.name}
                      price={menu.price}
                      image={menu.image}
                      popMessage={popMessage}
                      type={menu.type}
                    />
                  ))}
                {/* </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="fixed flex justify-center top-0 inset-x-0 m-6">
        <div
          className={
            (!showMessage
              ? "hidden transition-display duration-200 ease-out"
              : null) +
            " animate-bounce bg-white rounded-lg border-gray-300 border p-3 shadow-lg"
          }
        >
          <div className="flex flex-row">
            <div className="px-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 1792 1792"
                fill="#44C997"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
              </svg>
            </div>
            <div className="ml-2 mr-6">
              <span className="font-semibold">Successfully Orderd!</span>
              <span className="block text-gray-500"></span>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}
