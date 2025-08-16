import { useState } from "react";

export default function ModalRegister() {
  const [fname, setFname] = useState("");
  const [fnameError, setFnameError] = useState(false);

  const [lname, setLname] = useState("");
  const [lnameError, setLnameError] = useState(false);

  const [plan, setPlan] = useState("");
  const [planError, setPlanError] = useState(false);

  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState(false);

  const [buyBottle, setBuyBottle] = useState(false);
  const [buyShoes, setBuyShoes] = useState(false);
  const [buyCap, setBuyCap] = useState(false);

  const [agree, setAgree] = useState(false);

  // ----------------------------------------------------------------
  const inputFnameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFname(e.target.value);
    setFnameError(false);
  };

  const inputLnameOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLname(e.target.value);
    setLnameError(false);
  };

  const selectPlanOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlan(e.target.value);
    setPlanError(false);
  };

  const radioGenderOnChange = (value: string) => {
    setGender(value);
    setGenderError(false);
  };

  const cbBuyBottleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyBottle(e.target.checked);
  };
  const cbBuyShoesOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyShoes(e.target.checked);
  };
  const cbBuyCapOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyCap(e.target.checked);
  };

  const cbAgreeOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgree(e.target.checked);
  };

  // ----------------------------------------------------------------
  const computeTotalPayment = () => {
    let total = 0;
    let extraTotal = 0;

    if (plan === "funrun") total += 500;
    if (plan === "mini") total += 800;
    if (plan === "half") total += 1200;
    if (plan === "full") total += 1500;

    if (buyBottle) extraTotal += 200;
    if (buyShoes) extraTotal += 600;
    if (buyCap) extraTotal += 400;

    // ถ้าซื้อครบ 3 ชิ้น ลด 20% ของ Extra Items
    if (buyBottle && buyShoes && buyCap) {
      extraTotal = extraTotal * 0.8;
    }

    return total + extraTotal;
  };

  const isDiscounted = buyBottle && buyShoes && buyCap;

  // ----------------------------------------------------------------
  const registerBtnOnClick = () => {
    let valid = true;

    if (fname.trim() === "") {
      setFnameError(true);
      valid = false;
    }
    if (lname.trim() === "") {
      setLnameError(true);
      valid = false;
    }
    if (plan === "") {
      setPlanError(true);
      valid = false;
    }
    if (gender === "") {
      setGenderError(true);
      valid = false;
    }

    if (!valid) return;

    alert(
      `Registration complete. Please pay money for ${computeTotalPayment().toLocaleString()} THB.`
    );
  };

  return (
    <div
      className="modal fade"
      id="modalregister"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="modalregisterLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            {/* First & Last name */}
            <div className="d-flex gap-2">
              <div>
                <label className="form-label">First name</label>
                <input
                  className={"form-control" + (fnameError ? " is-invalid" : "")}
                  onChange={inputFnameOnChange}
                  value={fname}
                />
                {fnameError && (
                  <div className="invalid-feedback">Invalid first name</div>
                )}
              </div>
              <div>
                <label className="form-label">Last name</label>
                <input
                  className={"form-control" + (lnameError ? " is-invalid" : "")}
                  onChange={inputLnameOnChange}
                  value={lname}
                />
                {lnameError && (
                  <div className="invalid-feedback">Invalid last name</div>
                )}
              </div>
            </div>

            {/* Plan */}
            <div className="mt-2">
              <label className="form-label">Plan</label>
              <select
                className={"form-select" + (planError ? " is-invalid" : "")}
                onChange={selectPlanOnChange}
                value={plan}
              >
                <option value="">Please select..</option>
                <option value="funrun">Fun run 5.5 Km (500 THB)</option>
                <option value="mini">Mini Marathon 10 Km (800 THB)</option>
                <option value="half">Half Marathon 21 Km (1,200 THB)</option>
                <option value="full">Full Marathon 42.195 Km (1,500 THB)</option>
              </select>
              {planError && (
                <div className="invalid-feedback">Please select a Plan</div>
              )}
            </div>

            {/* Gender */}
            <div className="mt-2">
              <label className="form-label">Gender</label>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="radio"
                  onChange={() => radioGenderOnChange("male")}
                  checked={gender === "male"}
                />
                Male 👨
                <input
                  className="mx-2 form-check-input"
                  type="radio"
                  onChange={() => radioGenderOnChange("female")}
                  checked={gender === "female"}
                />
                Female 👩
              </div>
              {genderError && (
                <div className="text-danger">Please select gender</div>
              )}
            </div>

            {/* Extra Items */}
            <div className="mt-2">
              <label className="form-label">Extra Item(s)</label>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  onChange={cbBuyBottleOnChange}
                  checked={buyBottle}
                />
                Bottle 🍼 (200 THB)
              </div>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  onChange={cbBuyShoesOnChange}
                  checked={buyShoes}
                />
                Shoes 👟 (600 THB)
              </div>
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  onChange={cbBuyCapOnChange}
                  checked={buyCap}
                />
                Cap 🧢 (400 THB)
              </div>
            </div>

            <div className="alert alert-primary mt-3">
              Promotion📢 Buy all items to get 20% Discount
            </div>

            {/* Total Payment */}
            <div>
              Total Payment : {computeTotalPayment().toLocaleString()} THB
              {isDiscounted && (
                <span className="text-success d-block">(20% Discounted)</span>
              )}
            </div>
          </div>

          <div className="modal-footer d-flex fjustify-content-end align-items-center gap-3">
            <div className="form-check m-0">
              <input
                className="me-2 form-check-input me-2"
                type="checkbox"
                onChange={cbAgreeOnChange}
                checked={agree}
                id="agreeCheck"
              />
              <label className="form-check-label" htmlFor="agreeCheck">
                I agree to the terms and conditions
              </label>
            </div>
            <button
              className="btn btn-success my-2"
              onClick={registerBtnOnClick}
              disabled={!agree}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
