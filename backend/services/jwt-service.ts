import jsonwebtoken from 'jsonwebtoken';

export default class JwtService {

    static sign(payload: any) {
        return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
    }

    static verify(token: string) {
        return jsonwebtoken.verify(token, process.env.JWT_SECRET);
    }
}