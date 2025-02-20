import CategoriBox from "./CategoriBox.jsx";

export default function Categori(){
    return (   <section className="category_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>
              Category
            </h2>
          </div>
          <div className="category_container">
           <CategoriBox />
           <CategoriBox />
           <CategoriBox />
           <CategoriBox />
           <CategoriBox />
           <CategoriBox />

          </div>
        </div>
      </section>)
}