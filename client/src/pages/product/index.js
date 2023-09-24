import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faFilter,
  faSort,
  faCartShopping,
  faHeart as farHeart,
} from "@fortawesome/free-solid-svg-icons";
function Product() {
  return (
    <>
      {/* 商品廣告 */}
      <div class="ads d-flex row">
        <div class="ad col">Ad</div>
        <div class="main col-6">Main</div>
        <div class="ad col">Ad</div>
      </div>
      {/* 新品上架 */}
      <div className="title">新品上架</div>
      <div className="cards d-flex justify-content-between px-5 py-5">
        <div className="card">
          <img src="" />
          <div className="content d-flex flex-column justify-content-between">
            <div className="product-name d-flex">
              <div className="tag me-1">NEW</div>特選黑羽雞翅汝拉箭
            </div>
            <div className="description">汝拉箭6枚1913年 (5)</div>
            <div className="price text-end">$1500</div>
          </div>
        </div>
        <div className="card">
          <img src="" />
          <div className="content d-flex flex-column justify-content-between">
            <div className="product-name d-flex">
              <div className="tag me-1">NEW</div>特選黑羽雞翅汝拉箭
            </div>
            <div className="description">汝拉箭6枚1913年 (5)</div>
            <div className="price text-end">$1500</div>
          </div>
        </div>
        <div className="card">
          <img src="" />
          <div className="content d-flex flex-column justify-content-between">
            <div className="product-name d-flex">
              <div className="tag me-1">NEW</div>特選黑羽雞翅汝拉箭
            </div>
            <div className="description">汝拉箭6枚1913年 (5)</div>
            <div className="price text-end">$1500</div>
          </div>
        </div>
        <div className="card">
          <img src="" />
          <div className="content d-flex flex-column justify-content-between">
            <div className="product-name d-flex">
              <div className="tag me-1">NEW</div>特選黑羽雞翅汝拉箭
            </div>
            <div className="description">汝拉箭6枚1913年 (5)</div>
            <div className="price text-end">$1500</div>
          </div>
        </div>
        <div className="card">
          <img src="" />
          <div className="content d-flex flex-column justify-content-between">
            <div className="product-name d-flex">
              <div className="tag me-1">NEW</div>特選黑羽雞翅汝拉箭
            </div>
            <div className="description">汝拉箭6枚1913年 (5)</div>
            <div className="price text-end">$1500</div>
          </div>
        </div>
      </div>

      {/* 所有產品 */}
      <div className="title">所有產品</div>
      <div className="list">
        <div className="fk d-flex justify-content-between align-items-center">
          {/* 麵包屑 */}
          <div className="bread-crumb d-flex align-items-center">
            <div className="crumb-item">
              <a href="" className="mx-4">
                首頁
              </a>
              /
            </div>
            <div className="crumb-item">
              <a href="" className="mx-4">
                商店
              </a>
              /
            </div>
            <div className="crumb-item">
              <a href="" className="mx-4">
                所有商品
              </a>
            </div>
          </div>
          {/* btn-group */}
          <div className="wrap d-flex align-items-center px-2">
            {/* 排序篩選 */}
            <div
              className="btn-group me-3"
              role="group"
              aria-label="Basic outlined example"
            >
              <button type="button" className="btn btn-outline-primary">
                <FontAwesomeIcon
                  icon={faFilter}
                  className="fa-solid fa-filter me-2"
                />
                篩選商品 ({5})
              </button>
              <button type="button" className="btn btn-outline-primary">
                <FontAwesomeIcon
                  icon={faSort}
                  className="fa-solid fa-sort me-2"
                />
                排序
              </button>
            </div>
            {/* 每頁幾筆 */}
            <div className="per-page px-3 align-items-center d-flex">
              每頁顯示
              <button
                type="button"
                className="btn btn-primary dropdown-toggle mx-2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {5}
              </button>
              筆
            </div>
          </div>
        </div>

        {/* 所有產品 */}
        <div className="cards d-flex justify-content-around">
          <div className="card-list">
            <div className="img position-relative">
              <button className="p-0 position-absolute">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="fa-heart"
                />
                <FontAwesomeIcon
                  icon={farHeart}
                  className="far-heart"
                />

              </button>
            </div>
            <div className="content d-flex flex-column justify-content-center px-3">
              <div className="prodcut-name my-1">特選黑羽雞翅汝拉箭</div>
              <div className="price d-flex justify-content-between my-1">
                NT$ 8000
                <button className="">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="fa-solid fa-cart-shopping"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="card-list">
            <div className="img position-relative">
              <button className="p-0 position-absolute">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="fa-heart"
                />
                <FontAwesomeIcon
                  icon={farHeart}
                  className="far-heart"
                />

              </button>
            </div>
            <div className="content d-flex flex-column justify-content-center px-3">
              <div className="prodcut-name my-1">特選黑羽雞翅汝拉箭</div>
              <div className="price d-flex justify-content-between my-1">
                NT$ 8000
                <button className="">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="fa-solid fa-cart-shopping"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="card-list">
            <div className="img position-relative">
              <button className="p-0 position-absolute">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="fa-heart"
                />
                <FontAwesomeIcon
                  icon={farHeart}
                  className="far-heart"
                />

              </button>
            </div>
            <div className="content d-flex flex-column justify-content-center px-3">
              <div className="prodcut-name my-1">特選黑羽雞翅汝拉箭</div>
              <div className="price d-flex justify-content-between my-1">
                NT$ 8000
                <button className="">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="fa-solid fa-cart-shopping"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="card-list">
            <div className="img position-relative">
              <button className="p-0 position-absolute">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="fa-heart"
                />
                <FontAwesomeIcon
                  icon={farHeart}
                  className="far-heart"
                />

              </button>
            </div>
            <div className="content d-flex flex-column justify-content-center px-3">
              <div className="prodcut-name my-1">特選黑羽雞翅汝拉箭</div>
              <div className="price d-flex justify-content-between my-1">
                NT$ 8000
                <button className="">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="fa-solid fa-cart-shopping"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="card-list">
            <div className="img position-relative">
              <button className="p-0 position-absolute">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="fa-heart"
                />
                <FontAwesomeIcon
                  icon={farHeart}
                  className="far-heart"
                />

              </button>
            </div>
            <div className="content d-flex flex-column justify-content-center px-3">
              <div className="prodcut-name my-1">特選黑羽雞翅汝拉箭</div>
              <div className="price d-flex justify-content-between my-1">
                NT$ 8000
                <button className="">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="fa-solid fa-cart-shopping"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 優惠專區 */}
      <div className="title">優惠專區</div>
      <div className="sales d-flex justify-content-between">
        <div className="card">
          <div className="img"></div>
          <div className="content d-flex flex-column justify-content-around py-5 px-3">
            <div className="tags d-flex">
              <div className="tag1 text-center me-2">NEW</div>
              <div className="tag2 text-center">HOT</div>
            </div>
            <div className="product-name">特選黑羽雞翅汝拉箭6枚</div>
            <div className="price">$3000</div>
          </div>
        </div>
      </div>

      {/* inter */}
      <div className="inter-block text-center">真誠面對傳統，超越傳統。</div>

      {/* 相關商品推薦 */}
      <div className="title">相關商品推薦</div>
      <div className="cards d-flex justify-content-between px-5 py-5">
        <div className="card">
          <img src="" />
          <div className="content d-flex flex-column justify-content-between">
            <div className="product-name d-flex">
              <div className="tag me-1">NEW</div>特選黑羽雞翅汝拉箭
            </div>
            <div className="description">汝拉箭6枚1913年 (5)</div>
            <div className="price text-end">$1500</div>
          </div>
        </div>
        <div className="card">
          <img src="" />
          <div className="content d-flex flex-column justify-content-between">
            <div className="product-name d-flex">
              <div className="tag me-1">NEW</div>特選黑羽雞翅汝拉箭
            </div>
            <div className="description">汝拉箭6枚1913年 (5)</div>
            <div className="price text-end">$1500</div>
          </div>
        </div>
        <div className="card">
          <img src="" />
          <div className="content d-flex flex-column justify-content-between">
            <div className="product-name d-flex">
              <div className="tag me-1">NEW</div>特選黑羽雞翅汝拉箭
            </div>
            <div className="description">汝拉箭6枚1913年 (5)</div>
            <div className="price text-end">$1500</div>
          </div>
        </div>
        <div className="card">
          <img src="" />
          <div className="content d-flex flex-column justify-content-between">
            <div className="product-name d-flex">
              <div className="tag me-1">NEW</div>特選黑羽雞翅汝拉箭
            </div>
            <div className="description">汝拉箭6枚1913年 (5)</div>
            <div className="price text-end">$1500</div>
          </div>
        </div>
        <div className="card">
          <img src="" />
          <div className="content d-flex flex-column justify-content-between">
            <div className="product-name d-flex">
              <div className="tag me-1">NEW</div>特選黑羽雞翅汝拉箭
            </div>
            <div className="description">汝拉箭6枚1913年 (5)</div>
            <div className="price text-end">$1500</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Product;
