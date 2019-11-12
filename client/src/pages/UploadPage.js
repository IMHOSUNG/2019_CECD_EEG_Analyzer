import React from "react";
import styled from "styled-components";
import { post } from "axios";
import { Card, Form, Radio, Slider, Button } from "antd";

const PageContainer = styled("div")`
  background-color: #f0f3f7;
  display: flex;
  justify-content: center;
  padding-top: 100px;
  height: 960px;
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
  const setFile = filename => {
    file.current = filename;
  };
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err && file) {
        console.log("Received values of form: ", values);
        setAge(values.age);
        setGender(values.gender);
        updateFile();
      }
    });
  };
  const handleFileInput = e => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const updateFile = () => {
    const url =
      "https://cors-anywhere.herokuapp.com/" +
      "http://3.95.225.208:3000/post/create";
    const formData = new FormData();
    formData.append("age", age.current);
    formData.append("gender", gender.current);
    formData.append("textfile", file.current);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return post(url, formData, config)
      .then(response => {
        console.log(response);
        setFile(null);
      })
      .catch(error => {
        console.log(error);
      });
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
                min={10}
                max={49}
                type="text"
                marks={{
                  10: "10",
                  20: "20",
                  30: "30",
                  40: "40",
                  50: "50"
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
