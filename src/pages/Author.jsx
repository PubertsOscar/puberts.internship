import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  async function AuthorData() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthor(data);
  }

  function followBtn() {
    setIsFollowing(!isFollowing);
  }

  useEffect(() => {
    AuthorData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        {author.id ? (
          <section aria-label="section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">
                              @{author.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {isFollowing
                            ? author.followers + 1
                            : author.followers}{" "}
                          followers
                        </div>
                        <Link to="#" className="btn-main" onClick={followBtn}>
                          {isFollowing ? "Unfollow" : "Follow"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="de_tab tab_simple">
                    <AuthorItems author={author} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="col-md-12">
            <div className="d_profile de-flex">
              <div className="de-flex-col">
                <div className="profile_avatar">
                  <Skeleton
                    width={"150px"}
                    height={"150px"}
                    borderRadius={"999px"}
                  />
                  <div className="profile_name">
                    <h4>
                      <Skeleton width={"200px"} height={"25px"} />
                      <span className="profile_username">
                        <Skeleton width={"110px"} height={"20px"} />
                      </span>
                      <span id="wallet" className="profile_wallet">
                        <Skeleton width={"200px"} height={"20px"} />
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="profile_follow de-flex">
                <div className="de-flex-col">
                  <Skeleton
                    width={"140px"}
                    height={"40px"}
                    borderRadius={"6px"}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="de_tab tab_simple">
                <AuthorItems author={author} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Author;
