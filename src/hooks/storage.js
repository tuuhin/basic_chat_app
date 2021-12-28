export const useStorage = () => {
  const getData = () => {
    const userdata = sessionStorage.getItem("userdata");
    if (userdata != null) return JSON.parse(userdata);
  };
  const setUserData = (userdata) => {
    sessionStorage.setItem("userdata", JSON.stringify(userdata));
  };
  const removeData = () => {
    sessionStorage.clear();
  };
  return { getData, setUserData, removeData };
};
