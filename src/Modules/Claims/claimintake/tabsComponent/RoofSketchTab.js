import React, { useState } from 'react';
import {Input, Button, Table, Card, CardHeader, CardFooter} from 'reactstrap';

const RoofSketchTab = (props) => {
  return (
    <>
      <Card>
        <CardHeader className="rounded">
          ROOFING MATERIAL
        </CardHeader>
        <Table size="sm" borderless striped className="mb-0">
          <tbody>
            <tr>
              <td>Please Answer All Questions in this Section</td>
              <td>Inspection Data</td>
            </tr>
            <tr>
              <td>Single Roof</td>
              <td>
                <Input type="select" size="sm" disabled>
                  <option value="">Select</option>
                  <option value="3TAB">3-Tab</option>
                  <option value="ARCHITECTURAL">Architectural</option>
                  <option value="OTHER">Other</option>
                </Input>
              </td>
            </tr>
            <tr>
              <td>Tile Roof</td>
              <td>
                <Input type="select" size="sm" disabled>
                  <option value="">Select</option>
                  <option value="SFORMCONC">S-Form Concrete</option>
                  <option value="MFORMCONC">M-Form Concrete</option>
                  <option value="CLAYBARREL">Clay Barrel</option>
                  <option value="SPANISHBARREL">Spanish Barrel</option>
                  <option value="OTHER">Other</option>
                </Input>
              </td>
            </tr>
            <tr>
              <td>Metal Roof</td>
              <td>
                <Input type="select" size="sm" disabled>
                  <option value="">Select</option>
                  <option value="SHEET">Sheet</option>
                  <option value="OTHER">Other</option>
                </Input>
              </td>
            </tr>
            <tr>
              <td>Flat Roof</td>
              <td>
                <Input type="select" size="sm" disabled>
                  <option value="">Select</option>
                  <option value="2PLYBITUMEN">2-Ply Bitumen</option>
                  <option value="MDFYBITUMEN">Modified Bitumen</option>
                  <option value="OTHER">Other</option>
                </Input>
              </td>
            </tr>
            <tr>
              <td>Roof Findings</td>
              <td><Input size="sm" disabled /></td>
            </tr>
            <tr>
              <td>Damage Description</td>
              <td><Input type="textarea" disabled rows="5" /></td>
            </tr>
          </tbody>
        </Table>
      </Card>
      <Card>
        <CardHeader>
          OTHER EXTERIOR
        </CardHeader>
        <Table size="sm" borderless striped responsive className="mb-0">
          <tbody>
            <tr>
              <td>Please Answer All Questions in this Section</td>
              <td>Inspection Data</td>
            </tr>
            <tr>
              <td>Siding Type</td>
              <td>
                <Input type="select" size="sm" disabled>
                  <option value="">Select</option>
                  <option value="BRICK">Brick</option>
                  <option value="STUCCO">Stucco</option>
                  <option value="VINYL">Vinyl</option>
                  <option value="STONE">Stone</option>
                  <option value="OTHER">Other</option>
                </Input>
              </td>
            </tr>
            <tr>
              <td className="pl-2">
                A. Damaged Siding Area In SQ. FT.
              </td>
              <td>
                <Input size="sm" disabled />
              </td>
            </tr>
            <tr>
              <td className="pl-4">
                1. Damaged Siding Length In FT.
              </td>
              <td>
                <Input size="sm" disabled />
              </td>
            </tr>
            <tr>
              <td className="pl-4">
                2. Damaged Siding Width In FT.
              </td>
              <td>
                <Input size="sm" disabled />
              </td>
            </tr>
            <tr>
              <td className="pl-2">
                B. Total Siding Area In SQ. FT.
              </td>
              <td>
                <Input size="sm" disabled />
              </td>
            </tr>
            <tr>
              <td className="pl-4">
                1. Siding Length In FT.
              </td>
              <td>
                <Input size="sm" disabled />
              </td>
            </tr>
            <tr>
              <td className="pl-4">
                2. Siding Width In FT.
              </td>
              <td>
                <Input size="sm" disabled />
              </td>
            </tr>
            <tr>
              <td>Soffits & Fascia</td>
              <td>
                <Input type="select" size="sm" disabled>
                  <option value="">Select</option>
                  <option value="UPVC">UPvc</option>
                  <option value="WOODEN">Wooden</option>
                  <option value="VINYL">Vinyl</option>
                  <option value="METAL">Metal</option>
                  <option value="OTHER">Other</option>
                </Input>
              </td>
            </tr>
            <tr>
              <td className="pl-2">
                A. Damaged Soffits / Fascia Area In SQ. FT.
              </td>
              <td>
                <Input size="sm" disabled />
              </td>
            </tr>
            <tr>
              <td className="pl-4">
                1. Damaged Soffits / Fascia Length In FT.
              </td>
              <td>
                <Input size="sm" disabled />
              </td>
            </tr>
            <tr>
              <td className="pl-4">
                2. Damaged Soffits / Fascia Width In FT.
              </td>
              <td>
                <Input size="sm" disabled />
              </td>
            </tr>
            <tr>
              <td className="pl-2">
                B. Total Soffits / Fascia Area In SQ. FT.	
              </td>
              <td>
                <Input size="sm" disabled />
              </td>
            </tr>
            <tr>
              <td className="pl-4">
                1. Soffits / Fascia Length In FT.
              </td>
              <td>
                <Input size="sm" disabled />
              </td>
            </tr>
            <tr>
              <td className="pl-4">
                2. Soffits / Fascia Width In FT.
              </td>
              <td>
                <Input size="sm" disabled />
              </td>
            </tr> 
            <tr>
              <td>
                Fencing Type
              </td>
              <td>
                <Input size="sm" type="select" disabled >
                  <option value="">Select</option>
                  <option value="WOOD">Wood</option>
                  <option value="VINYLPVC">Vinyl / Pvc</option>
                  <option value="ALUMINUM">Aluminium</option>
                  <option value="CHAINLINK">Chain Link</option>
                  <option value="WROUGHTIRON">Wrought Iron</option>
                  <option value="OTHER">Other</option>
                </Input>
              </td>
            </tr> 
            <tr>
              <td className="pl-2">
                a. Total Fencing Area In LN. FT.
              </td>
              <td>
                <Input size="sm" disabled />
              </td>
            </tr> 
            <tr>
              <td className="pl-2">
                b. Damaged Fencing Area In LN. FT.
              </td>
              <td>
                <Input size="sm" disabled />
              </td>
            </tr> 
            <tr>
              <td>
                Other Structure
              </td>
              <td>
                <Input size="sm" type="select" disabled >
                  <option value="">Select</option>
                  <option value="SHED">Shed</option>
                  <option value="SCREENENC">Screen Enc</option>
                  <option value="PATIO">Patio</option>
                  <option value="OTHER">Other</option>
                </Input>
              </td>
            </tr> 
            <tr>
              <td className="pl-2">
                Damage Description
              </td>
              <td>
                <Input type="textarea" size="sm" rows="5" disabled />
              </td>
            </tr> 
          </tbody>
        </Table>
        <CardFooter className="text-center">
          <Button size="sm" color="primary">Save</Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default RoofSketchTab;