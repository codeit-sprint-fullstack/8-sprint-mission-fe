import Text from "@/components/atoms/Text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ArticleCreatePage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-9">
        <Text styleName="text-xl-bold" content="게시글 쓰기" />
        <Button variant="default" disabled={true}>
          등록
        </Button>
      </div>

      <div className="mb-6">
        <Text styleName="text-2lg-regular" content="*제목" className="mb-3" />
        <Input
          placeholder="제목을 입력해주세요"
          className="bg-(--secondary-color-100) py-3 px-6 h-[auto]"
        />
      </div>

      <div>
        <Text styleName="text-2lg-regular" content="*내용" className="mb-3" />
        <Textarea
          placeholder="내용을 입력해주세요"
          className="bg-(--secondary-color-100) resize-none h-[200px] md:h-[250px] lg:h-[282px] py-4 px-6"
        />
      </div>
    </div>
  );
}
