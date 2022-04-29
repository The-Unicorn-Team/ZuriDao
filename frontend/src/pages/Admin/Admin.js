import classNames from 'classnames';
import { useStyles } from './styles';

import { useGlobalStyles } from '../../styles';
import { Link } from 'react-router-dom';
import { useCallback, useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
const style = {
  Electbtn: `px-3 py-2  rounded hover:ml-6`,
};
const Admin = () => {
  const classes = useStyles();
  const globalStyles = useGlobalStyles();
  const {
    addTeacher,
    changeChairman,
    removeTeacher,
    pauseContract,
    unPauseContract,
  } = useContext(AppContext);
  const [address, setAddress] = useState('');
  const [chairman, setChairman] = useState('');
  const submitHandler = (event) => {
    event.preventDefault();
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await addTeacher(address);
  };
  const handleRemove = async (e) => {
    e.preventDefault();
    await removeTeacher(address);
  };
  const handleChair = async (e) => {
    e.preventDefault();
    await changeChairman(address);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-center align-items-center w-full ">
        <div className="flex flex-col sm:flex-row justify-center align-items-center w-full  mt-10">
          <Button
            title="Create Election"
            link="/add-election"
            style={`bg-green-500 ${style.Electbtn} bg-opacity-25`}
          />
          <Button
            title="Start Election"
            link="/start-election"
            style={`hover:bg-green-500 ${style.Electbtn} hover:bg-opacity-25`}
          />
          <Button
            title="End Election"
            link="/end-election"
            style={`hover:bg-red-500 ${style.Electbtn} hover:bg-opacity-25`}
          />
          <Button
            title="Make Public"
            link="/make-public"
            style={`hover:bg-blue-500 ${style.Electbtn} hover:bg-opacity-25`}
          />
          <Button
            title="Make Private"
            link="/make-private"
            style={`hover:bg-blue-500 ${style.Electbtn} hover:bg-opacity-25`}
          />
          <Button
            title="Get Candidate"
            link="/get-candidate"
            style={`hover:bg-gray-500 ${style.Electbtn} hover:bg-opacity-25`}
          />
        </div>
      </div>

      <div className="w-1/2 justify-center align-items-center">
        <section
          className={classNames(
            globalStyles.px,
            classes.hero,
            'bg-no-repeat flex flex-col pb-2',
          )}>
          <div className="col-md-9">
            <div className="row">
              <form class="row g-3">
                <div class="col-12">
                  <label for="inputAddress" class="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputAddress"
                    placeholder="Enter Address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div class="col-12">
                  <button
                    type="submit"
                    class="btn btn-primary mr-7"
                    onClick={handleAdd}>
                    Add Teacher
                  </button>
                  {'     '} {'     '}{' '}
                  <button
                    type="submit"
                    class=" pl-9 btn btn-warning"
                    onClick={handleRemove}>
                    Remove Teacher
                  </button>
                </div>
              </form>
            </div>
            <br />
            <br />
            <div>
              <label for="inputAddress" class="form-label">
                CHAIRMAN
              </label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="Enter Address"
                onChange={(e) => setChairman(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                class="btn btn-primary mr-7 mt-2"
                onClick={handleChair}>
                changeChairman
              </button>
            </div>
            <br />
            <br />
            <br />
            <br />
            <button
            
              className="btn btn-lg btn-success"
              onClick={unPauseContract}>
              Restart Contract
            </button>
            <br />
            <br />
            <button className="btn btn-lg btn-danger" onClick={pauseContract}>
              Pause Contract
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;

const Button = (prop) => {
  return (
    <div className={`px-4 py-2  ${prop.style}`}>
      <Link
        to={prop.link}
        className={`text-decoration-none text-gray-700 hover:text-gray-800 hover:font-semibold translate-x-2 duration-500`}
      >
        {prop.title}
      </Link>
    </div>
  );
};

