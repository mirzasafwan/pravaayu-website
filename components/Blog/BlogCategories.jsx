import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const BlogCategories = ({ categoryList, getDataCategory, getCategoryId }) => {
  const [names, setName] = useState([
    "Corporate Party",
    "Baby Shower",
    "Birthday Party",
    "Groom Ideas",
    "Bride Ideas",
    "Wedding Decor",
    "Mehendi Ideas",
    "Makeup Ideas",
    "Wedding Ideas",
    "BookEventZ",
  ]);
  const [newArray, setNewArray] = useState([]);
  const [setting, setSettings] = useState({});
  useEffect(() => {
    if (categoryList.length > 0) {
      const newArrayy = categoryList;
      for (const name of names) {
        const matchedObjects = newArrayy.filter((obj) => obj.name === name);
        for (const matchedObj of matchedObjects) {
          const index = newArrayy.indexOf(matchedObj);
          if (index !== -1) {
            newArrayy.splice(index, 1);
            newArrayy.unshift(matchedObj);
          }
        }
      }
      setNewArray(newArrayy);
    }
  }, [categoryList]);
  var settings = {
    infinite: false,
    centerMode: false,
    slidesToShow: 10,
    slidesToScroll: 5,
    swipe: true,
    showFull: true,
    showLoader: false,
  };
  var mobileSettings = {
    infinite: false,
    centerMode: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    swipe: true,
    showFull: true,
    showLoader: false,
  };
  useEffect(() => {
    if (window.innerWidth > 768) {
      setSettings(settings);
    } else {
      setSettings(mobileSettings);
    }
  }, [categoryList]);

  return (
    <>
      <div id="blog-cat-main">
        <Slider {...setting}>
          {newArray !== undefined &&
            newArray !== null &&
            newArray.length > 0 &&
            newArray.map((category, index) => {
              let img = "https://media.bookeventz.com/html/ui_website/blog-section/blogDummy.svg";
              switch (category.id) {
                case 2968:
                  img =
                    "https://media.bookeventz.com/html/ui_website/blog-section/blog_baby_shower.svg";
                  break;
                case 1454:
                  img = "https://media.bookeventz.com/html/ui_website/blog-section/blog_party.svg";
                  break;
                case 1:
                  img = "https://media.bookeventz.com/html/ui_website/blog-section/blog_bkz.svg";
                  break;
                case 2350:
                  img =
                    "https://media.bookeventz.com/html/ui_website/blog-section/blog_celeb_wedding.svg";
                  break;
                case 1455:
                  img =
                    "https://media.bookeventz.com/html/ui_website/blog-section/blog_cocktail.svg";
                  break;
                case 2323:
                  img =
                    "https://media.bookeventz.com/html/ui_website/blog-section/blog_c_party.svg";
                  break;
                case 2509:
                  img =
                    "https://media.bookeventz.com/html/ui_website/blog-section/covid_market.svg";
                  break;
                case 2352:
                  img =
                    "https://media.bookeventz.com/html/ui_website/blog-section/blog_engagement.svg";
                  break;
                case 2349:
                  img =
                    "https://media.bookeventz.com/html/ui_website/blog-section/blog_festive.svg";
                  break;
                case 2330:
                  img =
                    "https://media.bookeventz.com/html/ui_website/blog-section/blog_wed_ideas.svg";
                  break;
                case 2966:
                  img =
                    "https://media.bookeventz.com/html/ui_website/blog-section/blog_mehndi_ideas.svg";
                  break;
                case 2325:
                  img =
                    "https://media.bookeventz.com/html/ui_website/blog-section/blog_wed_decor.svg";
                  break;
                case 2943:
                  img =
                    "https://media.bookeventz.com/html/ui_website/blog-section/blog_groom_2.svg";
                  break;
                case 2351:
                  img =
                    "https://media.bookeventz.com/html/ui_website/blog-section/blog_haldi_ideas.svg";
                  break;
                case 1458:
                  img =
                    "https://media.bookeventz.com/html/ui_website/blog-section/blog_social_gat.svg";
                  break;
                case 1802:
                  img =
                    "https://media.bookeventz.com/html/ui_website/blog-section/blog_top_vendor.svg";
                  break;
                case 1874:
                  img =
                    "https://media.bookeventz.com/html/ui_website/blog-section/blog_top_venues.svg";
                  break;
                case 2969:
                  img =
                    "https://media.bookeventz.com/html/ui_website/blog-section/blog_wed_jewel.svg";
                  break;
                case 2326:
                  img =
                    "https://media.bookeventz.com/html/ui_website/blog-section/blog_wed_photo.svg";
                  break;
                case 2967:
                  img =
                    "https://media.bookeventz.com/html/ui_website/blog-section/blog_wed_songs.svg";
                  break;
                case 2324:
                  img =
                    "https://media.bookeventz.com/html/ui_website/blog-section/blog_sangeet_cerem.svg";
                  break;
                default:
              }
              return (
                <a href={"/blog/category/" + category.slug} target="_blank">
                  <div id="mini-blog-cat">
                    <span id="blog-cat-img">
                      <img
                        src={img}
                        alt="Blog category image"
                        className={category.slug == "bookeventz" ? "yes-image" : ""}
                      />
                    </span>
                    <span>{category.name}</span>
                  </div>
                </a>
              );
            })}
        </Slider>
      </div>
    </>
  );
};

export default BlogCategories;
