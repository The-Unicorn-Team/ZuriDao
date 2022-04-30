import react from 'react'
const ElectionCard = (props) => {

  return (
    <div class="col-6">
         <div className="card" >
        <img src={props.image.pictureFile} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{props.image.candidate_name}</h5>
            <button className="btn btn-danger float-right" onClick={props.handleRemove}>Remove</button>
            <button className="btn btn-primary my-3 float-right" onClick={() => props.addCandidate(props.keys)}>Add Candidate</button>

        </div>
    </div>
    </div>
  );
};

export default ElectionCard;
