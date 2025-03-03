import React from "react";
import { Badge, Button, Card, Container, Row, Image } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Header from "../Header";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BottomNavbar from "../BottomNavbar";
import "../../App.css";
import { Storage } from "aws-amplify";

const Category5 = () => {
  const [itemData, setItemData] = useState([]);
 window.localStorage.setItem("category", "home_furnishing");

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        "Colorish Cotton Blend Traditional Mandala Jaipuri Printed Bedsheet for Double Bed King Size with 2 Pillow Covers, Sea Green":
          "bedsheet",
        "TAUKIR CARPETS Handmade Collection Super Soft and Fluffy Microfiber Silk Touch Carpets, Size 4x6,feet Color, Sky Multi":
          "carpet",
        "CottonFry Faux Sheepskin Fur Area Rugs Round Fur Throw Rug Floor Mat Circular Carpet for Bedroom Soft Circle Kids Play Mat for Nursery (White Round, 30x30)":
          "cottoncarpet",
        "Fablicious Reversible AC Comforter Set King Size Double Bed with Bedsheet and 2 Pillow Covers Size- 90x100 Inch, Multicolor-3":
          "db-bedsheet",
        "SARAL HOME EASY LIVING Saral Home Jute Printed Doormat Set of 3. This set, designed with both style and functionality in mind, brings a touch of warmth to your doorstep.":
          "doormat",
        "Habitat Bed Elena Pillows for Sleeping 2 Pack, Standard Size 17x 27 Inch Cooling Pillows Set of 2, Top-end Microfiber Cover for Side Stomach Back Sleepers-White":
          "pillows",
        "STITCHNEST Ikat Yellow Teal Printed Cotton Canvas Table Runner and Bed Runner (13 x 72 Inches ) Add a touch of vibrant elegance to your dining or bedroom space with the STITCHNEST Ikat Yellow Teal Printed Cotton Canvas Table Runner and Bed Runner. ":
          "printcotton",
        "EIshro Home 8x28 Inches 3D Jet Multi Printed Stair Treds/Carpet/Door mats for Home/Floor mat for Kids, Pets and Elders Safety with Anti-Slip Rubber Backing. (6, Art Deco)":
          "staircarpet",
        "EBLOCKS OF INDIA Hand Block/Batik Printed Cotton Rectangular Table Cloth for 6 Seater Dining Table (60 Inch X 90 Inch) (Grey Blue Buta)":
          "tablecloth",
        "Decor & More Polyester Shower Curtain ||200 * 140 cm Bathroom Shower Curtains with 12 Hooks Included || Waterproof Shower Curtains for Bathroom, Hotels & Spa || Set of 1,Leaves Medium":
          "shower_curtain",
      };

      const itemsWithImages = await Promise.all(
        Object.entries(data).map(async ([key, value]) => {
          try {
            // Try fetching JPG image first
            const jpgImageUrl = await Storage.get(
              `home_furnishing/${value}.jpg`,
              {
                expires: 60,
              }
            );

            return { key, value, imageUrl: jpgImageUrl };
          } catch (error) {
            try {
              // If JPG image fetch fails, try fetching PNG image
              const pngImageUrl = await Storage.get(`${value}.png`, {
                expires: 60,
              });
              return { key, value, imageUrl: pngImageUrl };
            } catch (error) {
              console.error(`Error fetching image for ${value}:`, error);
              return { key, value, imageUrl: null };
            }
          }
        })
      );

      setItemData(itemsWithImages);
    };

    fetchData();
  }, []);

  function store(value) {
    window.localStorage.setItem("useritem", value);
  }

  return (
    <>
      <Header />
      <Container className="mb-5 me-5">
        <h5 className="text-center mb-5">Choose Items</h5>

        {itemData.map((item, index) => {
          return (
            <Row className="ms-5 mb-3" key={index}>
              <Col lg={9}>
                {item.imageUrl && (
                  <div className="d-flex align-items-center justify-content-between">
                    <Image
                      src={item.imageUrl}
                      alt={item.value}
                      width="50"
                      height="50"
                      className="cloimg"
                      rounded
                      fluid
                    />
                    <p className="ms-3">{item.key}</p>
                  </div>
                )}
              </Col>
              <Col lg={3} className="d-flex align-items-center">
                <Link to={"/Cart"} className="">
                  <Button
                    variant=""
                    style={{ background: "#163A66" }}
                    className="text-white"
                    onClick={() => store(item.value)}
                  >
                    Add to Cart
                  </Button>
                </Link>
              </Col>
            </Row>
          );
        })}
      </Container>
      <BottomNavbar />
    </>
  );
};

export default Category5;
