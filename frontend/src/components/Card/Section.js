const Section = (prop) => {
  let newProp = prop.data.sectionRight;
  return (
    <div className="flex flex-col justify-center items-center w-full sm:w-[60%] space-y-2">
      <h1 className={prop.styleTitle}>{newProp.title}</h1>
      <p className={prop.styleDescription}>{newProp.description}</p>
      <button className={prop.styleBtn}>{newProp.text}</button>
    </div>
  );
};

export default Section;
