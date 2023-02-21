import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";
const HotCollections = () => {
  const [author, setAuthor] = useState([]);

  async function fetchHotCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setAuthor(data);
  }
  useEffect(() => {
    fetchHotCollections();
  }, []);

  const options = {
    nav: true,
    loop: true,
    items: 4,
    margin: 10,
    dots: false,
    stagePadding: 10,
    responsive: {
      0: { items: 1 },
      470: { items: 2 },
      768: { items: 3 },
      1200: { items: 4 },
    },
  };
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {author.length ? (
            <>
              {author.length && (
                <OwlCarousel className="owl.theme" {...options}>
                  {author.map((auth) => (
                    <div className="nft_coll" key={auth.id}>
                      <div className="nft_wrap">
                        <Link to={`/item-details/${auth.nftId}`}>
                          <img
                            src={auth?.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${auth.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={auth?.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{auth?.title}</h4>
                        </Link>
                        <span>ERC-{auth?.code}</span>
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

export default HotCollections;
