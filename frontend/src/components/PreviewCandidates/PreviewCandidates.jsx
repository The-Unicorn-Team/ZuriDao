import react from 'react'
const PreviewCandidates = (props) => {

  return (
    <div class="col-6">
         <div className="card" >
        <img src={props.image.pictureFile} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{props.image.candidate_name}</h5>
            <button className="btn btn-danger float-right" onClick={props.handleRemove}>Remove</button>
        </div>
    </div>
    </div>
  );
};

export default PreviewCandidates;
