import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import getAddress from "../../services/apiGeocoding";


function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}


export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {

    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    // This will be the payload of the fulfilled thunk request // And in case of any error it will put an error property in action
    return { position, address };
  })


const initialState = {
  userName: "",
  status: 'idle',
  position: {},
  address: '',
  error: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.userName = action.payload
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.error = action.payload.error;
      })
})


export default userSlice.reducer;

export const { updateName } = userSlice.actions