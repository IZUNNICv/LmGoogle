import React, { useState } from "react";
import { useSelector } from "react-redux";

import Layout from "../../layout/Layout";
import LMaudio from "../../components/Dashboard/LMaudio";
const LMFront = () => {
  return (
    <Layout>
      <LMaudio />
    </Layout>
  );
};
export default LMFront;
