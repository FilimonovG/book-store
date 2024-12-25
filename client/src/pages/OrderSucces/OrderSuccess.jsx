import './OrderSuccess.css';
import Layout from '../../components/Layout/Layout';

function OrderSuccess(){
    return(
        <Layout>
            <div className={'success__header'}>
                <span>Заказ успешно оформлен!</span>
            </div>
        </Layout>
    );
}

export default OrderSuccess;