import React, { useState } from 'react';
import {Input, Button, Table, Card, CardHeader, CardFooter, CardBody} from 'reactstrap';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean']                                         // remove formatting button
  ]
}


const AddInfoTab = (props) => {
  const [text, setText] = useState('')
  const [activeEditor, setEditor] = useState('WC');
  return (
    <>
      <Card>
        <CardBody>
          <Table size="sm" borderless responsive>
            <tbody>
              <tr>
                <td>Total Estimate</td>
                <td><Input size="sm" /></td>
                <td>GR Release Amount</td>
                <td><Input size="sm" /></td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
        <CardFooter className="text-center">
          <Button size="sm" color="primary">Update</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <Button size="sm" color={activeEditor == 'WC' ? 'primary' : 'secondary'} className="mr-2">WC Time of Claim</Button>
          <Button size="sm" color={activeEditor == 'permit' ? 'primary' : 'secondary'}>Permit</Button>
        </CardHeader>
        <CardBody>
          {
            activeEditor == 'WC' ? (
              <>
                <CardHeader>
                  Weather Conditions time of claim
                </CardHeader>
                <ReactQuill value={text} modules={modules}/>  
              </>
            ) : (
              <>
                <CardHeader>
                  Building Officials & Permit
                </CardHeader>
                <ReactQuill value={text} modules={modules} />  
              </>
            )
          }
        </CardBody>
        <CardFooter className="text-center">
          <Button size="sm" color="primary">Save</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          Attachment List
          <Button className="float-right" size="sm" color="primary">Upload Images</Button>
        </CardHeader>
        <Table size="sm" striped borderless responsive>
          <thead>
            <tr>
              <th>TITLE</th>
              <th>FILE NAME</th>
              <th>DESCRIPTION</th>
              <th>USER</th>
              <th>DATE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </Table>
      </Card>
    </>
  )
}

export default AddInfoTab