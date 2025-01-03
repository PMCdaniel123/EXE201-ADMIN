import { Tag, Tooltip, Typography } from "antd";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { DeleteProduct } from "./actions";

export const PRODUCTS_TABLE_COLUMNS = [
  {
    title: "Image",
    dataIndex: "images",
    key: "images",
    render: (images) => {
      return (
        <img
          src={images[0].image_url}
          className={"w-32 h-32 object-cover"}
          alt=""
        />
      );
    },
  },
  {
    title: "Product Name",
    dataIndex: "product_name",
    key: "product_name",
    ellipsis: {
      showTitle: false,
    },
    render: (text, value) => (
      <Link to={"/products/" + value.id}>
        <Tooltip placement="top" title={text}>
          <Typography.Text>{text}</Typography.Text>
        </Tooltip>
      </Link>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Action",
    key: "operation",
    align: "center",
    render: (record) => {
      return (
        <img
          src={assets.bin_icon}
          alt=""
          className="h-10 mr-4 cursor-pointer px-3 py-2 hover:bg-red-400 text-center"
          onClick={() => DeleteProduct(record.id)}
        />
      );
    },
  },
];

export const CUSTOMER_TABLE_COLUMNS = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    ellipsis: {
      showTitle: false,
    },
    render: (text) => (
      <Tooltip placement="top" title={text}>
        <Typography.Text>{text}</Typography.Text>
      </Tooltip>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (role) =>
      role === "Designer" ? (
        <Tag color={"green"} key={"designer"}>
          DESIGNER
        </Tag>
      ) : (
        <Tag color={"magenta"} key={"customer"}>
          CUSTOMER
        </Tag>
      ),
  },
];

export const ORDERS_TABLE_COLUMNS = () => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text, value) => (
      <Link to={"/orders/" + value.id}>
        <Tooltip placement="top" title={text}>
          <Typography.Text>{text}</Typography.Text>
        </Tooltip>
      </Link>
    ),
  },
  {
    title: "Full Name",
    dataIndex: "full_name",
    key: "full_name",
  },
  {
    title: "Total Amount",
    dataIndex: "total_amount",
    key: "total_amount",
    render: (value) => <Typography.Text>${value}</Typography.Text>,
  },
  {
    title: "Shipping Address",
    dataIndex: "shipping_address",
    key: "shipping_address",
    width: 300,
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Payment Method",
    dataIndex: "payment_method",
    key: "payment_method",
    filters: [
      {
        text: 'COD',
        value: 'cod',
      },
      {
        text: 'Online',
        value: 'online',
      },
    ],
    onFilter: (value, record) => record.payment_method.indexOf(value) === 0,
  },
  {
    title: "Create At",
    dataIndex: "created_at",
    key: "created_at",
    sorter: {
      compare: (a, b) => new Date(b.created_at) - new Date(a.created_at),
    },
    render: (value) => {
      return (
        <Typography.Text>
          {new Date(value).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography.Text>
      );
    },
  },
];

export const BLOG_TABLE_COLUMNS = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    fixed: "left",
    width: 100,
    render: (text, value) => (
      <Link to={"/blogs/" + value.id}>
        <Tooltip placement="top" title={text}>
          <Typography.Text>{text}</Typography.Text>
        </Tooltip>
      </Link>
    ),
  },
  {
    title: "Image",
    dataIndex: "image_url",
    key: "image_url",
    render: (image) => {
      return (
        <img
          src={image === "null" ? assets.default_blog_image : image}
          className={"w-32 h-32 object-cover"}
          alt=""
        />
      );
    },
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    ellipsis: {
      showTitle: false,
    },
    render: (text) => (
      <Tooltip placement="top" title={text}>
        <Typography.Text>{text}</Typography.Text>
      </Tooltip>
    ),
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
    render: (auth) => <Typography.Text>{auth.name}</Typography.Text>,
  },
  {
    title: "Create At",
    dataIndex: "created_at",
    key: "created_at",
    render: (date) => (
      <Typography.Text>
        {new Date(date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Typography.Text>
    ),
  },
];
