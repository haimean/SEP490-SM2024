import { Box, Button, Card, Grid } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BaseBox from '../../common/BaseBox';
import CallApi from '../../../service/CallAPI';
import CustomSelectCp from '../../../components/host/FormInput/CustomSelectCp';
import EditorInput from '../../../components/host/FormInput/Editor';
import EmailCp from '../../../components/host/FormInput/EmailCp';
import FileUploadCp from '../../../components/host/FormInput/FileUploadCp';
import SectionCp from '../../../components/host/FormInput/SectionCp';
import SelectCp from '../../../components/host/FormInput/SelectCp';
import TelCp from '../../../components/host/FormInput/TelCp';
import TextFieldCp from '../../../components/host/FormInput/TextFieldCp';
import TimePickerCp from '../../../components/host/FormInput/TimePickerCp';
import TimePickerPreviewCp from './../../../components/host/FormInput/TimePickerPreviewCp';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const UpdateBranch = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [branchAtbList, setBranchAtbList] = useState([]);

  useEffect(() => {
    const fetchBranchAtbList = async () => {
      try {
        const response = await CallApi(`/api/host/attribute-branches`, 'get');
        setBranchAtbList(response?.data);
      } catch (error) {
        console.log(
          '=============== fetch branch attribute ERROR: ' +
            error.response?.data?.error,
        );
      }
    };

    fetchBranchAtbList();
  }, []);

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const response = await CallApi(`/api/host/branches/${id}`, 'get');
        setValue('branchName', response?.data?.name);
        setValue('description', response?.data?.description);
        setValue('phone', response?.data?.phone);
        setValue('email', response?.data?.email);
        setValue('image', response?.data?.image);
        setValue('managerName', response?.data?.account?.user?.fullName);
        setValue('provinces', response?.data?.address?.provinces);
        setValue('districts', response?.data?.address?.districts);
        setValue('wards', response?.data?.address?.wards);
        setValue('detail', response?.data?.address?.detail);
        setValue('businessLicense', response?.data?.businessLicense);
        setValue('openingHours', response?.data?.openingHours);
        setValue('closingHours', response?.data?.closingHours);
        response?.data?.attributeBranches.forEach((atb) => {
          const matchingAttribute = branchAtbList.find(
            (item) => item.id === atb.attributeKeyBranchesId,
          );
          if (matchingAttribute) {
            const matchingValue = matchingAttribute.attributeBranches.find(
              (attr) => attr.value === atb.value,
            );
            if (matchingValue) {
              setValue(
                `attributeBranches[${atb.attributeKeyBranchesId}]`,
                matchingValue.id,
              );
            }
          }
        });
      } catch (error) {
        console.log(
          '=============== fetch branch attribute ERROR: ' +
            error.response?.data?.error,
        );
      }
    };
    fetchBranch();
  }, [id, setValue, branchAtbList]);

  const addNewAttributeValue = useCallback(async (data) => {
    const requestData = {
      value: data.value,
      attributeKeyBranchesId: data.id,
    };
    try {
      const response = await CallApi(
        '/api/host/attribute-branches',
        'post',
        requestData,
      );
      toast.success(`Tạo ${response?.data?.value} thành công!`);

      setBranchAtbList((prevList) =>
        prevList.map((item) =>
          item.id === data.id
            ? {
                ...item,
                attributeBranches: [
                  ...item.attributeBranches,
                  { id: response.data.id, value: response.data.value },
                ],
              }
            : item,
        ),
      );

      return { id: response.data.id, value: response.data.value };
    } catch (error) {
      toast.error(error.response?.data?.error);
      return null;
    }
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    try {
      formData.append('name', data.branchName);
      formData.append('description', data.description);
      formData.append('phone', data.phone);
      formData.append('openingHours', data.openingHours);
      formData.append('closingHours', data.closingHours);

      data.attributeBranches.forEach((item) => {
        if (item !== '') {
          formData.append(`attributeBranches`, item);
        }
      });

      if (typeof data.image !== 'string') {
        formData.append('image', data.image);
      }

      await CallApi(`/api/host/branches/${id}`, 'put', formData);
      navigate(`/host/branch/${id}`);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      toast.success(`Cập nhật cơ sở ${data.branchName} thành công!`);
    } catch (error) {
      toast.error(
        error.response?.data?.error || 'Có lỗi xảy ra khi cập nhật cơ sở',
      );
    }
  };

  const serviceOptions = useMemo(
    () =>
      branchAtbList.map((item) => ({
        name: `attributeBranches[${item.id}]`,
        key: item.id,
        label: item.name,
        type: 'select-custom',
        required: false,
        options: [
          { key: '', label: 'Chọn giá trị' },
          ...item.attributeBranches.map((itemChildren) => ({
            key: itemChildren.id,
            label: itemChildren.value,
          })),
        ],
        gridWidth: 6,
        onCustomInput: (data) => addNewAttributeValue({ ...data, id: item.id }),
      })),
    [branchAtbList, addNewAttributeValue],
  );

  const contactInfo = [
    {
      name: 'branchContact',
      label: 'Thông tin liên hệ cơ sở',
      type: 'section',
      required: true,
    },
    {
      name: 'phone',
      label: 'Số điện thoại liên hệ',
      type: 'tel',
      required: true,
      gridWidth: 6,
    },
    {
      name: 'email',
      label: 'Địa chỉ email liên hệ',
      type: 'email',
      required: true,
      gridWidth: 6,
    },
  ];

  const avt = {
    name: 'image',
    type: 'image',
    label: 'Ảnh cơ sở',
    required: true,
    gridWidth: 12,
  };

  const branchName = {
    name: 'branchName',
    label: 'Tên cơ sở',
    type: 'text',
    required: true,
    gridWidth: 12,
  };
  const activityInfo = [
    {
      name: 'branchWork',
      label: 'Giờ hoạt động',
      type: 'section',
      required: true,
    },
    {
      name: 'openingHours',
      label: 'Giờ mở cửa',
      type: 'timepickerpreview',
      required: true,
      gridWidth: 6,
    },
    {
      name: 'closingHours',
      label: 'Giờ đóng cửa',
      type: 'timepickerpreview',
      required: true,
      gridWidth: 6,
    },
  ];

  //Thông tin thêm
  const additionInfo = [
    {
      name: 'additionInfo',
      label: 'Thông tin thêm',
      type: 'section',
      required: true,
    },
    ...serviceOptions,
  ];
  const description = {
    name: 'description',
    label: 'Mô tả',
    type: 'editor',
    required: true,
    gridWidth: 12,
  };
  const descriptionTitle = {
    name: 'descriptionTitle',
    label: 'Mô tả thêm',
    type: 'section',
    required: true,
    gridWidth: 12,
  };
  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'number':
        return <TextFieldCp field={field} control={control} errors={errors} />;
      case 'tel':
        return <TelCp field={field} control={control} errors={errors} />;
      case 'email':
        return <EmailCp field={field} control={control} errors={errors} />;
      case 'select':
        return <SelectCp field={field} control={control} errors={errors} />;
      case 'select-custom':
        return (
          <CustomSelectCp
            field={field}
            control={control}
            errors={errors}
            setValue={setValue}
          />
        );
      case 'image':
        return <FileUploadCp field={field} control={control} errors={errors} />;
      case 'section':
        return <SectionCp field={field} />;
      case 'timepicker':
        return <TimePickerCp field={field} control={control} errors={errors} />;
      case 'timepickerpreview':
        return (
          <TimePickerPreviewCp
            field={field}
            control={control}
            errors={errors}
          />
        );
      case 'editor':
        return <EditorInput field={field} control={control} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <BaseBox title="Sửa thông tin cơ sở">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        {/* ảnh và thông tin chung */}
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item xs={6} justifyContent={'center'}>
            <Grid
              item
              sm={12}
              md={12}
              key={`${avt.name}-${JSON.stringify(avt.options)}`}
            >
              {renderField(avt)}
            </Grid>
          </Grid>
          <Grid container item xs={6} spacing={2}>
            <Grid
              item
              sm={12}
              md={12}
              key={`${branchName.name}-${JSON.stringify(branchName.options)}`}
            >
              {renderField(branchName)}
            </Grid>
            <Grid item>
              <Card variant="outlined" className="w-full p-3 pt-0">
                <Grid
                  container
                  item
                  sm={12}
                  md={12}
                  spacing={2}
                  className="p-2"
                >
                  {contactInfo.map((contact) => (
                    <Grid
                      container
                      item
                      sm={12}
                      md={12}
                      key={`${contact.name}-${JSON.stringify(contact.options)}`}
                    >
                      {renderField(contact)}
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>
            <Grid item>
              <Card variant="outlined" className="w-full p-3 pt-0">
                <Grid
                  container
                  item
                  sm={12}
                  md={12}
                  spacing={2}
                  className="p-2"
                >
                  {activityInfo.map((activity) =>
                    activity.name == 'branchWork' ? (
                      <Grid
                        container
                        item
                        sm={12}
                        md={12}
                        key={`${activity.name}-${JSON.stringify(
                          activity.options,
                        )}`}
                      >
                        {renderField(activity)}
                      </Grid>
                    ) : (
                      <Grid
                        container
                        item
                        sm={6}
                        md={6}
                        key={`${activity.name}-${JSON.stringify(
                          activity.options,
                        )}`}
                      >
                        {renderField(activity)}
                      </Grid>
                    ),
                  )}
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* thông tin thêm  */}
        <Grid item container className="w-full pt-3">
          <Card variant="outlined" className="w-full p-3 pt-1">
            <Grid item sm={12} md={12} container spacing={2}>
              {additionInfo.map((business) =>
                business.name == 'additionInfo' ? (
                  <Grid
                    container
                    item
                    sm={12}
                    md={12}
                    key={`${business.name}-${JSON.stringify(business.options)}`}
                  >
                    {renderField(business)}
                  </Grid>
                ) : (
                  <Grid
                    container
                    item
                    sm={4}
                    md={4}
                    key={`${business.name}-${JSON.stringify(business.options)}`}
                  >
                    {renderField(business)}
                  </Grid>
                ),
              )}
            </Grid>
          </Card>
        </Grid>

        {/* mô tả thêm  */}
        <Grid item container spacing={2}>
          <Grid
            container
            item
            sm={12}
            md={12}
            key={`${descriptionTitle.name}-${JSON.stringify(
              descriptionTitle.options,
            )}`}
          >
            {renderField(descriptionTitle)}
          </Grid>
          <Grid
            container
            item
            sm={12}
            md={12}
            key={`${description.name}-${JSON.stringify(description.options)}`}
          >
            {renderField(description)}
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained" color="primary">
            Lưu thông tin
          </Button>
        </Box>
      </form>
    </BaseBox>
  );
};

export default UpdateBranch;
