import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExpiryDateCountDown from "../UI/ExpiryDateCountDown";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [explores, setExplores] = useState([]);
  const [loadMores, setloadMores] = useState(8);

  async function exploreApi() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setExplores(data);
  }

  async function filterNft(value) {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`
    );
    setExplores(data);
  }

  useEffect(() => {
    exploreApi();
  }, []);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => filterNft(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {explores.length ? (
        <>
          {explores.slice(0,loadMores).map((explore) => (
            <div
              key={explore.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${explore.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={explore.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <></>
                {explore.expiryDate && <ExpiryDateCountDown item={explore} />}
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
                  <Link to={`/item-details/${explore.nftId}`}>
                    <img
                      src={explore.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${explore.nftId}`}>
                    <h4>{explore.title}</h4>
                  </Link>
                  <div className="nft__item_price">{explore.price}ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{explore.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        new Array(8).fill(0).map((_, index) => (
          <div
            key={index}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <Skeleton width={"100%"} height={"400px"} />
          </div>
        ))
      )}
          {loadMores !== 16 && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={() => setloadMores(loadMores + 4)}
          >
            Load more
          </Link>
        </div>
          ) }
    </>
  );
};
export default ExploreItems;
