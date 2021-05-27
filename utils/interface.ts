//PAGES INTERFACES

export interface regFormType {
  utype: string;
  uname: string;
  fName: string;
  lName: string;
  email: string;
  password: string;
  password2: string;
}

export interface loginFormType {
  emailOrUname: string;
  password: string;
}

export interface userType {
  utype: string;
  uname: string;
  fName: string;
  lName: string;
  email: string;
  password: string;
}

export interface regPropType {
  setAlert: (msg: string, alertType: string) => string;
  registerUser: (userType) => string;
  loadUser: () => void;
  isAuthenticated: boolean;
}

//COMPONENTS INTERFACES
interface alerts {
  msg: string;
  alertType: string;
  id: string;
}
export interface alertPropType {
  alerts: alerts[];
}

//REDUX INTERFACES
export interface setAlertDispatchType {
  type: string;
  payload: {
    msg: string;
    alertType: string;
    id: string;
  };
}
