import { Header } from "../components/Header";
import { Container } from "../components/Container";
import "./Data.css";
import { Avatar, Button, Card, Space, Table, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { PillTag } from "../components/PillTag";
import {
  CaretRightOutlined,
  CommentOutlined,
  EyeOutlined,
  InstagramOutlined,
  LikeOutlined,
  TikTokOutlined,
} from "@ant-design/icons";

const { Column } = Table;

export function MainPage() {
  const { fetching, tableData, handlePagination } = useMainPageDataLayer();
  console.log("🚀 ~ MainPage ~ tableData:", tableData);

  return (
    <div>
      <Header />
      <Container>
        <main>
          <Table
            loading={fetching}
            dataSource={tableData.data}
            pagination={{
              pageSize: 30,
              total: tableData.total_contents,
              onChange: (page) => handlePagination(page),
            }}
          >
            <Column
              title="Date"
              key="date"
              dataIndex={["content", "timestamp"]}
              render={(date) => {
                const dateObj = new Date(date);
                const month = MONTHS[dateObj.getMonth()];
                const day = dateObj.getDate();

                return <span>{`${month} ${day}`}</span>;
              }}
            />
            <Column
              title="Video"
              key="video"
              width={80}
              dataIndex={["content", "text"]}
              render={(text) => {
                let ellipsisText = text;

                if (ellipsisText.length > 20) {
                  ellipsisText = `${text.slice(0, 20)}...`;
                }

                return (
                  <PillTag>
                    <Space size="small">
                      <CaretRightOutlined
                        style={{ color: "#3354FF", fontSize: 14 }}
                      />
                      <span>{ellipsisText}</span>
                    </Space>
                  </PillTag>
                );
              }}
            />
            <Column
              title="Creator"
              key="creator"
              dataIndex={["creator"]}
              render={(creator) => {
                return (
                  <div>
                    <Space size="small">
                      <Avatar size={16} src={creator.profile_picture_url} />
                      <span>{creator.username}</span>
                    </Space>
                  </div>
                );
              }}
            />
            <Column
              title="Platform"
              key="platform"
              dataIndex={["creator", "platform"]}
              render={(platform) => {
                if (platform === "instagram") {
                  return <InstagramOutlined />;
                }

                return <TikTokOutlined />;
              }}
            />
            <Column
              title="Total views"
              key="total_views"
              dataIndex={["content", "views"]}
            />
            <Column
              title="Total engagement"
              key="total_engagement"
              dataIndex={["content", "total_engagement"]}
            />
            <Column
              title="Engagement rate"
              key="engagement_rate"
              dataIndex={["content", "engagement_of_views"]}
              render={(engagement_rate) => {
                const roundedRate = (engagement_rate * 100).toFixed(1);

                return <span>{`${roundedRate}%`}</span>;
              }}
            />
            <Column
              title="Actions"
              key="actions"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              render={(_data) => {
                return <Button>View Posts</Button>;
              }}
            />
          </Table>

          <section>
            <div>
              <Typography.Title level={3}>
                All posts
                <Typography.Text
                  style={{ marginLeft: 5 }}
                  type="secondary"
                >{`(${tableData.total_contents} total posts)`}</Typography.Text>
              </Typography.Title>
            </div>

            <div className="all-posts-wrapper">
              {tableData.data.map((item) => {
                return (
                  <div className="single-post-card" key={item.content.id}>
                    <div
                      className="single-post-card-bg-image"
                      style={{
                        backgroundImage: `url(${item.content.thumbnail_url})`,
                      }}
                    >
                      <div className="single-post-card--body">
                        <Space size="small">
                          <Avatar
                            size={16}
                            src={item.creator.profile_picture_url}
                          />
                          <span>{item.creator.name}</span>
                        </Space>
                      </div>
                    </div>

                    <div className="single-post-card--footer">
                      <span>
                        <EyeOutlined /> {item.content.views}
                      </span>

                      <span>
                        <LikeOutlined /> {item.content.likes}
                      </span>

                      <span>
                        <CommentOutlined /> {item.content.comments}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </Container>
    </div>
  );
}

function useMainPageDataLayer() {
  const [fetching, setFetching] = useState(false);
  const [tableData, setTableData] = useState<{
    data: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      content: Record<string, any>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      creator: Record<string, any>;
    }[];
    next: number;
    page: number;
    page_size: number;
    total_contents: number;
  }>({
    data: [],
    next: 0,
    page: 0,
    page_size: 30,
    total_contents: 0,
  });

  const getTableData = async (page = 1) => {
    setFetching(true);

    try {
      const response = await fetch(
        `https://hackapi.hellozelf.com/frontend/api/v1/contents?page=${page}`,
        {
          method: "GET",
          mode: "cors",
        }
      ).then((res) => res.json());

      setTableData(response);
    } catch (error) {
      const err = error as Error;
      message.error(err.message || "Something went wrong on the server");
    }

    setFetching(false);
  };

  const handlePagination = (page: number) => {
    getTableData(page);
  };

  useEffect(() => {
    getTableData();
  }, []);

  return { fetching, tableData, handlePagination };
}

const MONTHS: Record<number, string> = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Oct",
};
