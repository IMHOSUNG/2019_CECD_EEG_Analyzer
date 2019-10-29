import React from "react";
import styled from "styled-components";
import { post } from "axios";
import { Card, Form, Radio, Slider, Button } from "antd";

const PageContainer = styled("div")`
  background-color: #f0f3f7;
  display: flex;
  justify-content: center;
  padding-top: 100px;
  height: 900px;
`;

const Container = styled(Card)`
  width: 800px;
  height: 500px;
`;

const Title = styled("span")`
  font-size: 18px;
`;

const UploadPage = props => {
  const { getFieldDecorator } = props.form;
  const age = React.useRef(0);
  const gender = React.useRef("");
  const file = React.useRef(null);
  const setAge = num => {
    age.current = num;
  };
  const setGender = text => {
    gender.current = text;
  };
  const setFile = obj => {
    file.current = obj;
  };
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        setAge(values.age);
        setGender(values.gender);
      }
    });
    updateFile();
  };
  const handleFileInput = e => {
    setFile(e.target.files[0]);
  };

  const updateFile = () => {
    const url = "http://localhost:5000/upload/update";
    const formData = new FormData();
    formData.append("age", age.current);
    formData.append("gender", gender.current);
    formData.append("textfile", file.current);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return post(url, formData, config);
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
  };
  return (
    <PageContainer>
      <Container title={<Title>UPLOAD</Title>} hoverable bordered={true}>
        <Form {...formItemLayout} onSubmit={handleSubmit}>
          <Form.Item label="성별" type="text">
            {getFieldDecorator("gender")(
              <Radio.Group>
                <Radio.Button value="0">남성</Radio.Button>
                <Radio.Button value="1">여성</Radio.Button>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="연령" type="text">
            {getFieldDecorator("age")(
              <Slider
                type="text"
                marks={{
                  0: "0",
                  20: "20",
                  40: "40",
                  60: "60",
                  80: "80",
                  100: "100"
                }}
              />
            )}
          </Form.Item>
          <Form.Item label="EEG">
            <input type="file" name="file" onChange={e => handleFileInput(e)} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 6, offset: 9 }}>
            <Button type="primary" htmlType="submit" size="large" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </PageContainer>
  );
};

export default Form.create()(UploadPage);
