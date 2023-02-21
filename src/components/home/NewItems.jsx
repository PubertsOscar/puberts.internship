import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";
import ExpiryDateCountDown from "../UI/ExpiryDateCountDown";

const NewItems = () => {
  const [items, setItems] = useState([]);

  async function newItemsData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItems(data);
  }
  useEffect(() => {
    newItemsData();
  }, []);

  const options = {
    nav: true,
    loop: true,
    margin: 10,
    responsive: {
      0: { items: 1 },
      470: { items: 2 },
      768: { items: 3 },
      1200: { items: 4 },
    },
  };
  return (
    <section
      id="section-items"
      className="no-bottom"
      data-aos="fade-in"
      data-aos-duration="500"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {items.length ? (
            <>
              {items.length && (
                <OwlCarousel className="owl.theme" {...options}>
                  {items.map((item) => (
                    <div className="nft__item" key={item.authorId}>
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Creator: Monica Lucas"
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {item.expiryDate && <ExpiryDateCountDown item={item} />}
                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${item.ntfId}`}>
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </OwlCarousel>
              )}
            </>
          ) : (
            <OwlCarousel className="owl-theme" {...options}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Skeleton height={"100%"} width={"100%"} />
                </div>
                <div className="nft_coll_pp">
                  <Skeleton
                    height={"60px"}
                    width={"60px"}
                    borderRadius={"50%"}
                  />
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Skeleton
                    height={"20px"}
                    width={"150px"}
                    borderRadius={"8px"}
                  />
                </div>
                <Skeleton height={"20px"} width={"80px"} borderRadius={"8px"} />
              </div>
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
