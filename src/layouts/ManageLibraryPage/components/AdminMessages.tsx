import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import AdminMessageRequest from "../../../models/AdminMessageRequest";
import MessageModel from "../../../models/MessageModel";
import { Pagination } from "../../Utils/Pagination";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { AdminMessage } from "./AdminMessage";

export const AdminMessages = () => {

    const { authState } = useOktaAuth();


    //normal loading pices
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //message endpoint state
    const [messages, setMessages] = useState<MessageModel[]>([]);


    //pagination
    const [messagePerPage] = useState(5);
    const [currentPage, setcurrentPage] = useState(1);
    const [totalPages, settotalPages] = useState(0);

    //recall useEffect
    const [btnSubmit, setBtnSubmit] = useState(false)

    useEffect(() => {

        const fetchUserMessages = async () => {

            if (authState && authState?.isAuthenticated) {
                const url = `http://localhost:8080/api/messages/search/findByClosed/?closed=false&page=${currentPage - 1}&size=${messagePerPage}`;

                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    },
                };

                const messagesResponse = await fetch(url, requestOptions);

                if (!messagesResponse.ok) { throw new Error('Something went wrong'); }
                const messagesResponseJson = await messagesResponse.json();

                setMessages(messagesResponseJson._embedded.messages);
                settotalPages(messagesResponseJson.page.totalPages)

            }

            setIsLoadingMessages(false);
        }

        fetchUserMessages().catch((error: any) => {

            setIsLoadingMessages(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0)
    }, [authState, currentPage, btnSubmit]);

    if (isLoadingMessages) {
        return (
            <SpinnerLoading />
        );
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        );
    }


    async function submitResponseToQuestion(id: number, respone: string) {

        const url = `http://localhost:8080/api/messages/secure/admin/message`;

        if (authState && authState?.isAuthenticated && id !== null && respone !== '') {

            const messageAdminRequestModel: AdminMessageRequest = new AdminMessageRequest(id, respone);
            const requestOptions = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageAdminRequestModel)
            };

            const messageAdminRequestModelResponse = await fetch(url, requestOptions);

            if (!messageAdminRequestModelResponse.ok) { throw new Error('Something went wrong'); }

            setBtnSubmit(!btnSubmit)
        }

    }

    //page function
    const paginate = (pageNumber: number) => setcurrentPage(pageNumber);



    return (
        <div className="mt-3 ">
            {messages.length > 0 ?

                <>
                    <h5>Pending Q/A:</h5>
                    {messages.map(message => (
                        <AdminMessage message={message} key={message.id} submitResponseToQuestion={submitResponseToQuestion} />
                    ))}
                </>
                :
                <h5>No Pending Q/A</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}
        </div>
    );

}