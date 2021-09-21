import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useStyletron } from 'baseui';
import { Input } from "baseui/input";
import { Button } from 'baseui/button';
import { Textarea } from 'baseui/textarea';
import { Cell, Grid } from 'baseui/layout-grid';
import { DatePicker } from "baseui/datepicker";
import { Select } from "baseui/select";
import { FileUploader } from "baseui/file-uploader";

import Space from '../../Atoms/Space';
import FormGroup from '../../Molecule/FormGroup';

const ProfileForm = () => {
  const [css] = useStyletron();
  const { handleSubmit, control } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div className={css({ padding: '64px' })}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Cell span={8}>
            <h2>Edit Details</h2>
          </Cell>
        </Grid>
        <Grid>
          <Cell span={6}>
            <Grid>
            <Cell span={12}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <FormGroup
                    control="input"
                    controlProps={{
                      ...field
                    }}
                    label="Full Name"
                  />
                )}
              />
            </Cell>
          </Grid>
            <Grid>
              <Cell span={12}>
                <Controller
                  name="dob"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={new Date()}
                  render={({ field }) => (
                    <FormGroup
                      control="datePicker"
                      controlProps={{
                        ...field,
                        value: new Date()
                      }}
                      label="DoB"
                    />
                  )}
                />
              </Cell>
            </Grid>
            <Grid>
              <Cell span={12}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormGroup
                      control="input"
                      controlProps={{
                        ...field
                      }}
                      label="Email"
                    />
                  )}
                />
              </Cell>
            </Grid>
            <Grid>
              <Cell span={12}>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormGroup
                      control="input"
                      controlProps={{
                        ...field
                      }}
                      label="Phone Number"
                    />
                  )}
                />
              </Cell>
            </Grid>
            <Grid>
              <Cell span={12}>
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormGroup
                      control="input"
                      controlProps={{
                        ...field
                      }}
                      label="City"
                    />
                  )}
                />
              </Cell>
            </Grid>
            <Grid>
              <Cell span={12}>
                <Controller
                  name="state"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormGroup
                      control="input"
                      controlProps={{
                        ...field
                      }}
                      label="State"
                    />
                  )}
                />
              </Cell>
            </Grid>
            <Grid>
              <Cell span={12}>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormGroup
                      control="select"
                      controlProps={{
                        options: [
                          { label: "AliceBlue", id: "#F0F8FF" },
                          { label: "AntiqueWhite", id: "#FAEBD7" },
                          { label: "Aqua", id: "#00FFFF" },
                          { label: "Aquamarine", id: "#7FFFD4" },
                          { label: "Azure", id: "#F0FFFF" },
                          { label: "Beige", id: "#F5F5DC" }
                        ],
                        ...field
                      }}
                      label="Country"
                    />
                  )}
                />
              </Cell>
            </Grid>
            <Space />
            <Grid>
          <Cell span={12}>
            <Button type="submit">Save Details</Button>
          </Cell>
        </Grid>
          </Cell>
          <Cell span={6}>
            <FileUploader />
          </Cell>
        </Grid>
      </form>
    </div>
  );
}

export default ProfileForm;
